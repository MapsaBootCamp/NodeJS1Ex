const sqlite3 = require("sqlite3").verbose();
const db_OQ = "db.sqlite" //path.join(__dirname, "data", "onlineQuiz.db");
const db = new sqlite3.Database(db_OQ, err => {
  if (err) {
    return console.error(err.message);
  }
  else{
    // console.log("Successful connection to the database 'onlineQuiz.db' and start config db");
    db.serialize(() => {
      //db user
      const sql_create_users = `CREATE TABLE IF NOT EXISTS Users (
                                  username VARCHAR(100) NOT NULL PRIMARY KEY UNIQUE,
                                  email TEXT 
                                );`;

      db.run(sql_create_users, err => {
        if (err) {
          return console.error(err.message);
        }
        // console.log("Successful creation of the 'Users' table");
      });

      const sql_insert_users = `INSERT INTO Users (username) VALUES (? , ?),(?),(?);`;

      db.run(sql_insert_users, "elham", "mahdi", "negin", err => {
        if (err) {
          return console.error(err.message);
        }
        // console.log("Successful creation of 3 users");
      });


      //db question
      db.run(`CREATE TABLE IF NOT EXISTS Questions(
        question_id INTEGER PRIMARY KEY,
        question TEXT NOT NULL UNIQUE,
        answer TEXT NOT NULL,
        option1 TEXT NOT NULL,
        option2 TEXT NOT NULL,
        quiz_number INTEGER
      )`, err => {
        if (err) {
          return console.error(err.message);
        }
        // console.log("Successful creation of the 'Questions' table");

        const sql_insert_ques = `INSERT INTO Questions (question, answer, option1, option2, quiz_number) 
        VALUES ("2*2=" , "4", "3", "2", 1),
          ("JavaScript side" , "both", "back", "front", 1),
          ("Area of circle is ", "pr^2", "2pr", "hpr", 1),
          ("vahede hajm", "m^3", "m^2", "m", 2)` 

          db.run(sql_insert_ques, err => {
          if (err) {
            return console.error(err.message);
          }
          // console.log("Successful creation of 4 questions");
        });
      });


      //db Quiz
      db.run(`CREATE TABLE IF NOT EXISTS Quizes(
        user VARCHAR(100),
        question INTEGER,
        quiz INTEGER,
        user_answer TEXT,
        point INTEGER NOT NULL,
        CONSTRAINT Quizes_pk PRIMARY KEY (user, question, quiz)
        FOREIGN KEY (user)
            REFERENCES Users(username)
        FOREIGN KEY (question)
            REFERENCES Questions(question_id)
      )`, err => {
        if (err) {
          return console.error(err.message);
        }
        // console.log("Successful creation of the 'Quizes' table");
      });

    })
    // console.log("finish config db");
  }
});



  module.exports = db