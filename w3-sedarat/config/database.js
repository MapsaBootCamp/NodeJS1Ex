import sqlite3 from "sqlite3";
import { questionArr } from "./questionBank.js";
const dbName = `quiz.sqlite`;

export const db = new sqlite3.Database(dbName);
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
      userID INTEGER PRIMARY KEY AUTOINCREMENT,
      userName	TEXT NOT NULL UNIQUE,
      password	TEXT
      )`);

  db.run(
    `INSERT INTO users(userName, password) VALUES(?,?)`,
    "testUser",
    `1234`
  );

  db.run(`CREATE TABLE IF NOT EXISTS questions (
        questionID INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        question TEXT NOT NULL,
        choice1	TEXT NOT NULL,
        choice2	TEXT NOT NULL,
        choice3	TEXT NOT NULL,
        choice4	TEXT NOT NULL,
        rightAnswer INTEGER
        )`);

  const stmt = db.prepare(
    `INSERT INTO questions(category, question, choice1, choice2, choice3, choice4, rightAnswer) VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  for (let i = 0; i < questionArr.length; i++) {
    stmt.run(questionArr[i]);
  }

  db.run(`CREATE TABLE IF NOT EXISTS quiz (
          quizID INTEGER PRIMARY KEY AUTOINCREMENT,
          userID INTEGER NOT NULL,
          status INTEGER NOT NULL CHECK (status IN (0, 1)),
          Percentage INTEGER NOT NULL,
          FOREIGN KEY(userID) REFERENCES users(userID)
          )`);

  db.run(`CREATE TABLE IF NOT EXISTS quizItems (
            quizID	INTEGER NOT NULL,
            questionID	INTEGER NOT NULL,
            userAnswer INTEGER CHECK (userAnswer IN (NULL, 1, 2, 3, 4)),
            FOREIGN KEY(quizID) REFERENCES quiz(quizID),
            FOREIGN KEY(questionID) REFERENCES questions(questionID)
            )`);
});
