
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
                db.serialize(()=>{
                    const lastExamId = db.get(`SELECT MAX(exam_id) FROM exams`,(err,row)=>{
                        if(err){ throw err}
                        else if(row['MAX(exam_id)']) { 
                            console.log(row)
                            console.log('max');
                            return row }
                        else return 1
                    })
                    const stmt = db.prepare('INSERT INTO exams VALUES(?,?,?,?)',()=>{console.log(lastExamId);})
                    for(let i=0;i<5;i++){
                        console.log('start inserting');
                        console.log(newExam[i].q_id);
                        stmt.run(lastExamId,newExam[i].q_id,userId,null,null,(err)=>{
                            if(err){console.log('there is an error');
                                throw err
                            }})}
                    stmt.finalize((err)=>{
                        if(err) throw err
                        else{
                            console.log('Generating exam is done.');
                            console.log(newExam);
                            resolve (newExam)}})})
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