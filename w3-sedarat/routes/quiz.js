import { Router } from "express";
import { db } from "../config/database.js";
import {
  asyncRun,
  asyncAll,
  asyncGet,
} from "../config/async-sqlite-methods.js";
import { createNewQuiz } from "../utils.js";

const quizRouter = Router();

// get categories
quizRouter.route("/category").get(async (req, res) => {
  let [err, rows] = await asyncAll(`SELECT DISTINCT category FROM questions`);
  if (err) {
    throw err;
  }
  res.json(rows);
});

// get questions
quizRouter.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  const category = req.body.category;

  db.serialize(async () => {
    // checking user has "notfinished quiz" or not
    let [notFinishedQuizErr, notFinishedQuiz] = await asyncGet(
      `SELECT quizID FROM quiz WHERE userID =? AND status = 0;`,
      id
    );
    if (notFinishedQuizErr) {
      throw notFinishedQuizErr;
    }

    // if user doesn't have notfinished quiz
    if (notFinishedQuiz === undefined) {
      notFinishedQuiz = await createNewQuiz(id, category);
    }

    // get questions from last quiz
    let [currentQuestionsErr, currentQuestions] = await asyncAll(
      `SELECT questionID, question, choice1, choice2, choice3, choice4 
    FROM questions INNER JOIN quizItems USING(questionId) WHERE quizID = ?`,
      notFinishedQuiz.quizID
    );
    if (currentQuestionsErr) {
      throw currentQuestionsErr;
    }

    // send questions
    res.send(currentQuestions);
  });
});

// register answers
quizRouter.route("/:id").post(async (req, res) => {
  const id = req.params.id;
  // checking that answer was sended
  if (!req.body) {
    return res.status(400).json({
      err: "answer is required!",
    });
  }

  // find active quiz
  let [notFinishedQuizErr, notFinishedQuiz] = await asyncGet(
    `SELECT quizID FROM quiz WHERE userID =? AND status = 0`,
    id
  );
  if (notFinishedQuizErr) {
    throw notFinishedQuizErr;
  }

  // submit answers
  await new Promise((resolve, reject) => {
    db.serialize(() => {
      const stmt = db.prepare(
        `UPDATE quizItems SET userAnswer = ? WHERE quizID = ? AND questionID = ?`
      );
      for (let elm of req.body) {
        stmt.run(elm.userAnswer, notFinishedQuiz.quizID, elm.questionID);
      }
      stmt.finalize((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });

  // check quiz status
  const [checkQuizStatusErr, checkQuizStatus] = await asyncAll(
    `SELECT * FROM quizItems WHERE quizID = ? AND userAnswer ISNULL`,
    notFinishedQuiz.quizID
  );
  if (checkQuizStatusErr) {
    throw checkQuizStatusErr;
  }

  // if quiz finished
  if (checkQuizStatus[0] === undefined) {
    // set quiz status
    await asyncRun(`UPDATE quiz SET status=? WHERE quizID=?`, [
      1,
      notFinishedQuiz.quizID,
    ]);

    // avaluate right answers number
    const [rightAnswersErr, rightAnswers] = await asyncAll(
      `SELECT questionID FROM quizItems INNER JOIN questions USING(questionId) WHERE quizId = ? AND quizItems.userAnswer = questions.rightAnswer`,
      notFinishedQuiz.quizID
    );
    if (rightAnswersErr) {
      throw rightAnswersErr;
    }

    // calculate right answers percentage
    let sum = 0;
    for (let elm of rightAnswers) {
      sum++;
    }
    let avg = (sum * 100) / 5;

    // update percentage
    await asyncRun(`UPDATE quiz SET Percentage=? WHERE quizID=?`, [
      avg,
      notFinishedQuiz.quizID,
    ]);
  }
  res.send("answers registered");
});

export default quizRouter;
