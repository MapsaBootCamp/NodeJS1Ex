const sqlite3 = require("sqlite3").verbose()
const DBFILENAME = "db.sqlite"

const db = new sqlite3.Database(DBFILENAME, (err) => {
    if(err){
        throw err.message
    }
    else{
        console.log("starting db config...");
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS user(
                user_id INTEGER PRIMARY KEY,
                username TEXT 
            )`)
            db.run(`CREATE TABLE IF NOT EXISTS quiz(
                quiz_id INTEGER PRIMARY KEY,
                quizpack TEXT,
                answer TEXT 
            )`)
            db.run(`CREATE TABLE IF NOT EXISTS history(
                history_id INTEGER PRIMARY KEY,
                user INTEGER NOT NULL,
                quiz INTEGER NOT NULL,
                done INTEGER NOT NULL CHECK (done IN (0, 1)),
                mark INTEGER ,

                FOREIGN KEY (user)
                    REFERENCES user(user_id),
                FOREIGN KEY (quiz)
                    REFERENCES quiz(quiz_id)
            )`)
        })
        console.log("finish config db...");
    }
})

module.exports = db