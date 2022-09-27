const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("db.sqlite",(err)=>{
    if(err){
        console.log(err.message)
        throw "failed to connect to database"
    }else{
        db.run(`CREATE TABLE IF NOT EXISTS user(
            username TEXT PRIMARY KEY,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            token TEXT 
        )`,(err)=>{
            if(err)console.log(err.message)
        })
        db.run(`CREATE TABLE IF NOT EXISTS quiz(
            quiz_name TEXT NOT NULL ,
            quiz_id TEXT NOT NULL PRIMARY KEY,
            number_of_questions INTEGER NOT NULL,
            FOREIGN KEY(username) REFERENCES user(username),
            FOREIGN KEY(food_name) REFERENCES food(food_name)
        )`,(err)=>{
            if(err)console.log(err.message)
        })
        db.run(`CREATE TABLE IF NOT EXISTS quiz_answers(
            quiz_id TEXT NOT NULL,
            correct_answer TEXT NOT NULL,
            FOREIGN KEY(quiz_id) REFERENCES quiz_id(quiz)
        )`,(err)=>{
            if(err)console.log(err.message)
        })
        db.run(`CREATE TABLE IF NOT EXISTS history(
            quiz_id TEXT NOT NULL,
            username TEXT NOT NULL
        )`,(err)=>{
            if(err)console.log(err.message)
        })
        console.log("connected to database...")
    }
})
module.exports = db