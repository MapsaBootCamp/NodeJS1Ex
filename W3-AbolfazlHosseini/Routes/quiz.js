const exp = require("express")
const db = require("../config/database.js")
const router = exp.Router()

router.post("/show_quizes",(req,res)=>{
db.all("SELECT * FROM quiz",(err,rows)=>{
    if(err){
        return res.status(500).json({"message":err.message})
    }
    const result = []
    db.get("SELECT * FROM user WHERE token = ?",req.body.token,async (err2,row)=>{
        if(err2){
    return res.status(500).json({"message":err2.message})
    }       
    if(!row){
        return res.status(400).json({"message":"invalid token(unauthorized)"})
    }
   const check=()=>new Promise (function(resolve,reject){
     for(const i of rows){
        db.get("SELECT * FROM history WHERE username = ? AND quiz_id = ?",row.username,i.quiz_id,(err3,row2)=>{
            if(err3){
                return res.status(500).json({"message":err2.message})
                }       
                if(!row2){
                    result.push(i)
                }
        })
    }})
    await check()
    res.status(200).json({"message":"Done","quizes":result})
    })
    
})
})


router.post("/submit_quiz",(req,res)=>{
    const quiz_id = req.body.quiz_id
    const answers = req.body.answers.split('')
    db.get("SELECT * FROM user WHERE token = ?",req.body.token,(err,row)=>{
        if(err){
            return res.status(500).json({"message":err.message})
        }
        if(!row){
            return res.status(400).json({"message":"token not valid(unauthorized)"})
        }
        db.get("SELECT * FROM quiz_answers WHERE quiz_id = ?",quiz_id,(err2,row2)=>{
            if(err2){
                return res.status(500).json({"message":err.message})
            }
            if(!row2){
                return res.status(400).json({"message":"token not valid(unauthorized)"})
            }
            const correct_answers = row2.correct_answer.split('')
            const percentage = correction(answers,correct_answers)
            db.run("INSERT INTO history (quiz_id,username) VALUES (?, ?)",quiz_id,row.username,(err)=>{
                if(err){
                    return res.status(500).json({"message":err.message})
                }else{
                    db.run(`CREATE TABLE IF NOT EXISTS ?(
                        percentage TEXT ,
                        answers TEXT NOT NULL
                    )`,row.username+"_"+quiz_id,(err)=>{
                        if(err)console.log(err.message)
                        else{
                            db.run("INSERT INTO ? (percentage,answers)VALUES(?,?)",row.username+"_"+quiz_id,percentage,req.body.answers)
                        }
                    })
                }
            })
        })
    })
})
function correction(answers,correct_answers) {
    let correct = 0
    let wrong = 0
    for(let i = 1;i<=answers;i++){
        if(answers[i]==correct_answers[i]){
            correct++
        }
        if(answers[i]!=0){
            wrong++
        }
    }
    return (((3*correct)-wrong)/((answers.length()-1)*3))
}
module.exports = router