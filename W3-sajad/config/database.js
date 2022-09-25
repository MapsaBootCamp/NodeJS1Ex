const sqlite = require('sqlite3').verbose()




const db = new sqlite.Database('db.sqlite',(err)=>{

    if(err){
        console.log('db connection failed ... ');
        throw err.message
    }
    else{
        console.log('db connection was successful ...');
        db.run(`CREATE TABLE IF NOT EXISTS users(
                user_id INTEGER PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                last_exam INTEGER NOT NULL CHECK (last_exam IN (0,1)),
                last_exam_id INTEGER 
        )`,(err)=>{
            if(err){
                throw err.message
            }
        })
        db.run(`CREATE TABLE IF NOT EXISTS questions(
            q_id INT PRIMARY KEY,
            description TEXT NOT NULL,
            category TEXT NOT NULL,
            answer INTEGER NOT NULL CHECK (answer IN (1,2,3,4))
        )`,(err)=>{
            if(err){
                throw err.message
            }
        })
        db.run(`CREATE TABLE IF NOT EXISTS exams(
            exam_id INTEGER PRIMARY KEY ,
            q_id,
            user_id,
            exam_score INTEGER NULL ,
            FOREIGN KEY(q_id)
                REFERENCES questions(q_id),
            FOREIGN KEY(user_id)
                REFERENCES users(user_id)
        ) `,(err)=>{
            if(err){
                throw err.message
            }
        })
    }
})



module.exports = db