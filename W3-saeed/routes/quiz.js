const express = require("express")
const db = require("../config/database")

const router = express.Router()


const getUserPomise = (req) => new Promise(function(resolve, reject){
    db.get(`SELECT * FROM user WHERE username=?`, req.params.username, (err, row) => {
        if(err){return reject(err);}
        resolve(row);
    })
})

router.get("/:username" , async (req, res) => {
    
    db.serialize(async()=>{
        
        const userObj = await getUserPomise(req)
        if(!userObj){
            return res.send("in usero nadarim")
        }

        db.get(`SELECT * FROM history INNER JOIN quiz ON history.quiz = quiz.quiz_id
            WHERE user=? ORDER BY history_id DESC LIMIT 1;`, userObj.user_id , (err, row) => {
            if(err | row == undefined) {
                console.log("sakht azmoon jadid"); 
                db.get(`SELECT quizpack FROM quiz WHERE quiz_id=?`,1,(err, row)=>{
                    if(err){
                        return res.send("quiz nadarim!")
                    }
                    db.run('INSERT INTO history(user, quiz, done, mark) VALUES(?, ?, ?, ?)', 
                    [userObj.user_id, 1, 0, null ])
                    return res.send(row.quizpack)
                })
            }

            else{
                
                if(row.done == 0 ){
                    console.log("ye azmoon anjam nashode dari");
                    
                    return res.send(row.quizpack)
                }
                else{
                    
                    db.get(`SELECT * FROM quiz WHERE quiz_id=?`,row.quiz + 1,(err, row)=>{
                        if(err | row == undefined){
                            return res.send("quiz bishtar nadarim!")
                        }
                        
                        db.run('INSERT INTO history(user, quiz, done, mark) VALUES(?, ?, ?, ?)', 
                        [userObj.user_id, row.quiz_id , 0, null ])
                        return res.send(row.quizpack)
                    })
                }
            }
        })
    })
})

router.post("/:username", async (req, res) => {
    db.serialize(async() => {
        const userObj = await getUserPomise(req)
        if(!userObj){
            return res.send("in usero nadarim")
        }

        db.get("SELECT answer FROM history INNER JOIN quiz ON history.quiz = quiz.quiz_id WHERE user = ? AND done = ?",[userObj.user_id,0], (err, row) => {
            
            if(err | row == undefined) return res.send("azmoon jadid begir!")

            let realAnswers = JSON.parse(row.answer)
            
            let right = 0
            for(let i = 1; i <= Object.keys(realAnswers).length; i++){
                
                if(realAnswers[`${i}`] == req.body[`${i}`]){
                    
                    right++
                }
            }
            db.run('UPDATE history SET mark = ? , done = ? WHERE user = ? AND done = ?',[right * 4 , 1, userObj.user_id, 0])
            return res.send("javab ersal shod!")
        })

    })
})

router.get("/history/:username", async(req,res)=> {
    const userObj = await getUserPomise(req)
    if(!userObj){
        return res.send("in usero nadarim")
    }
    db.all(`SELECT * FROM history WHERE user = ?` , userObj.user_id, (err, row)=>{
        if(err) return res.send("chizi nist")
        
        return res.send(row)
    })

})


module.exports = router

