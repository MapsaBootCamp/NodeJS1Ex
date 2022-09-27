import { Router } from "express";
import { asyncAll } from "../config/async-sqlite-methods.js";

const router = Router();

// get passed quiz history
router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  // get summary of all quiz history
  let [err, rows] = await asyncAll(
    `SELECT quizID, Percentage FROM quiz WHERE userID = ?`,
    id
  );
  if (err) {
    throw err;
  }
  res.json(rows);
});

router.route("/:id/:quizID").get(async (req, res) => {
  const id = req.params.id;
  const quizid = req.params.quizID;
  //get history of special quiz answers
  let [err, rows] = await asyncAll(
    `SELECT quizID, questionID, userAnswer, rightAnswer FROM quizItems INNER JOIN questions USING(questionID) WHERE quizID = ?`,
    quizid
  );
  if (err) {
    throw err;
  }
  return res.json(rows);
});
export default router;
