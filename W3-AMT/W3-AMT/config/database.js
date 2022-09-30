const Sqlite3 = require('sqlite3').verbose()
const DBFILENAME = "db.sqlite"
const db = new Sqlite3.Database(DBFILENAME,(err)=>{
    if(err){
        console.log(err.message)
         throw 'failed to connect or create DataBase'
    }else{
        db.run(`CREATE TABLE IF NOT EXISTS users(
                    user_id INTEGER PRIMARY KEY,
                    username TEXT NOT NULL UNIQUE,
                    password TEXT
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS question(
                question_id INTEGER PRIMARY KEY,
                content TEXT,
                category TEXT,
                d TEXT,
                a TEXT,
                b TEXT,
                c TEXT,
                right TEXT NOT NULL
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS azmon(
                azmon_num INTEGER PRIMARY KEY,
                user INTEGER NOT NULL,
                sitution INTEGER CHECK (sitution IN (0,1)),
                precent INTEGER,
                FOREIGN KEY (user)
                  REFERENCES users (user_id)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS azmonitem(
                id INTEGER PRIMARY KEY,
                azmon_id INTEGER NOT NULL UNIQUE,
                question_id INTEGER NOT NULL UNIQUE,
                answer TEXT,
                FOREIGN KEY (question_id)
                  REFERENCES question (question_id)
        )`);
    }
});

module.exports = db;