import { db } from "./config/database.js";
import { asyncAll, asyncGet, asyncRun } from "./config/async-sqlite-methods.js";

//get user data
export async function getUser(id) {
  let [userErr, user] = await asyncAll(
    "SELECT * FROM users WHERE userID=?",
    id
  );
  if (userErr) {
    throw userErr;
  }
  if (user[0]) {
    return user[0];
  } else {
    return res.status(404).json({
      err: "this user not exist",
    });
  }
}

//create new quiz
export async function createNewQuiz(id, category) {
  // create quiz

  await asyncRun(
    `INSERT INTO quiz(userID, status, Percentage) VALUES (?, ?, ?)`,
    [id, 0, 0]
  );

  // get new quizID

  let [currentQuizIDErr, currentQuizID] = await asyncGet(
    `SELECT quizID FROM quiz WHERE userID =? AND status = 0;`,
    id
  );
  if (currentQuizIDErr) {
    throw currentQuizIDErr;
  }

  // select 5 questions from question bank for new quiz randomly depended on category
  if (category) {
    let [questionsErr, questions] = await asyncAll(
      `SELECT questionID FROM questions WHERE questions.category = ? ORDER BY RANDOM() LIMIT 5;`,
      category
    );
    if (questionsErr) {
      throw questionsErr;
    }
  } else {
    let [questionsErr, questions] = await asyncAll(
      `SELECT questionID FROM questions ORDER BY RANDOM() LIMIT 5;`,
      category
    );
    if (questionsErr) {
      throw questionsErr;
    }

    //insert selected questions into quizItems table

    await new Promise((resolve, reject) => {
      db.serialize(() => {
        const stmt = db.prepare(
          `INSERT INTO quizItems(quizID, questionID) VALUES (?,?)`
        );
        for (let elm of questions) {
          stmt.run(currentQuizID.quizID, elm.questionID);
        }
        stmt.finalize((err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }
  return currentQuizID;
}
