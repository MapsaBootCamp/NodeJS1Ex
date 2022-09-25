
const { reject } = require("lodash");
const db = require("./config/database")

async function db_get(query, param){
    return new Promise(function(resolve,reject){
        db.get(query, param, function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
    });
}

async function getUser(userName){
    const result = [null, null]
    try{
        result[1] = await db_get("SELECT * FROM users WHERE username =?", userName)
    }catch(err){
        result[0] = err
    }
    return result;
}


async function examGenerator(category,userId){
    return new Promise((resolve,reject)=>{
        console.log('Generating new exam ...');
        db.all(`SELECT q.q_id,q.description FROM questions as q WHERE q.q_id NOT IN 
        (SELECT q_id FROM exams WHERE user_id = ?) AND q.category = ? LIMIT 5`,userId,category,(err,rows)=>{
            if(err) reject(err)
            else{
                const newExam = rows
                for(let i=0;i<5;i++){
                    console.log('start inserting');
                    console.log(newExam[i].q_id);
                    db.run('INSERT INTO exams VALUES(MAX(exam_id)+1,?,?,?)',newExam[i].q_id,userId,null,null,(err)=>{
                        if(err){reject(err)
                        console.log('there is an error');} 
                    })

                }
                console.log('Generating exam is done.');
                console.log(newExam);
                resolve (newExam)
            }
        })
    })
}


async function userUpdater(userId,state){
    return new Promise((resolve,reject)=>{
        db.run('UPDATE users SET last_exam = ? WHERE user_id = ?',state,userId,(err)=>{
            if(err) reject(err)
            else resolve()
        })
    })
}


module.exports = {getUser , examGenerator,userUpdater}
// examGenerator('math',1)