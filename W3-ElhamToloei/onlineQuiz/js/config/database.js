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

      const sql_insert_users = `INSERT INTO Users (username) VALUES (?),(?),(?);`;
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
        option1 TEXT NOT NULL,
        option2 TEXT NOT NULL,
        option3 TEXT NOT NULL,
        option4 TEXT NOT NULL,
        correct_answer TEXT NOT NULL
      )`, err => {
        if (err) {
          return console.error(err.message);
        }
        // console.log("Successful creation of the 'Questions' table");

        const sql_insert_ques = `INSERT INTO Questions (question, option1, option2, option3, option4, correct_answer) 
        VALUES ("2*2=" , "2.5", "3", "2", "4", "option4"),
          ("JavaScript side" , "back", "front", "both", "non of them", "option3"),
          ("Area of circle is ", "pr^2", "2pr", "hpr" , "1/3prh", "option1"),
          ("vahede hajm", "m^4", "m^3", "m^2", "m", "option2")` 

          db.run(sql_insert_ques, err => {
          if (err) {
            return console.error(err.message);
          }
          // console.log("Successful creation of 4 questions");
        });
      });


      //db Quiz generator
      db.run(`CREATE TABLE IF NOT EXISTS Quizes(
        user VARCHAR(100),
        question_id INTEGER,
        quiz_number INTEGER ,
        user_answer TEXT,
        CONSTRAINT Results_pk PRIMARY KEY (user, question_id, quiz_number)
        FOREIGN KEY (user)
            REFERENCES Users(username)
        FOREIGN KEY (question_id)
            REFERENCES Questions(question_id)
      )`, err => {
        if (err) {
          return console.error(err.message);
        }
        // console.log("Successful creation of the 'Quizes' table");
      });


      //db  result of quiz 
      db.run(`CREATE TABLE IF NOT EXISTS Results(
        user VARCHAR(100),
        quiz INTEGER,
        score INTEGER,
        state INTEGER NOT NULL DEFAULT 0 CHECK (state IN (0, 1)),
        CONSTRAINT Results_pk PRIMARY KEY (user, quiz)
        FOREIGN KEY (user)
            REFERENCES Quizes(user)
        FOREIGN KEY (quiz)
            REFERENCES Quizes(quiz_number)
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