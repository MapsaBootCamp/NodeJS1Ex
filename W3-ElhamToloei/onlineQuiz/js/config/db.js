const sqlite3 = require("sqlite3").verbose();
const db_OQ = "db.sqlite" //path.join(__dirname, "data", "onlineQuiz.db");
const db = new sqlite3.Database(db_OQ, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'onlineQuiz.db'");
});

const sql_create_users = `CREATE TABLE IF NOT EXISTS Users (
                            Username VARCHAR(100) NOT NULL PRIMARY KEY UNIQUE
                          );`;

db.run(sql_create_users, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'Users' table");
});


const sql_insert_users = `INSERT INTO Users (Username) VALUES (?),(?),(?);`;

  db.run(sql_insert_users, "elham", "mahdi", "negin", err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of 3 users");
  });
  

  module.exports = db