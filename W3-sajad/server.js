const express = require('express')
const { keyBy } = require('lodash')
const db = require('./config/database')
const {getUser,examGenerator,userUpdater} = require('./utils')

const app = express()
const PORT = 3000
app.use(express.json())

const categories = ['history','math','physics']
app.get('/:username/exam' ,async (req,res)=>{
    const userName = req.params.username;
    const [err,founcedUserName] = await getUser(userName)
    if(err) res.status(500).json({"Error": err.message})
    else{
        if(!founcedUserName){
            res.status(404).json({"error": "this user doesn't exist"})
        }
        else{
            if(founcedUserName.last_exam){
                if(categories.includes(req.body.category)){
                try{
                const newExam = await examGenerator(req.body.category,founcedUserName.user_id)
                await userUpdater(founcedUserName.user_id,0)
                 res.status(200).json({"new exam": newExam})
                }catch(err){
                    res.status(500).json({'error':err.message})
                }
                }else{
                    res.status(400).json({"error": 'please choose the category if your exam'})
                }
            }else{
                db.all(`SELECT MAX(exam_id),e.q_id,q.description FROM exams as e
                INNER JOIN questions as q ON e.q_id = q.q_id WHERE user_id =?`,founcedUserName.user_id,(err,rows)=>{
                    if(err) res.status(500).json({'error':err.message})
                    res.status(200).json({'lastExam':rows})
                })
            }
        }
    }
})


app.post('/:username/exam',async (req,res)=>{
    const userName = req.params.username;
    const [err,founcedUserName] = await getUser(userName)
    if(err) res.status(500).json({"Error": err.message})
    else{
        if(!founcedUserName){
            res.status(404).json({"error": "this user doesn't exist"})
        }
        else{
            if(!req.body){
                res.status(400).json({'Error':'you have to send your answers!'})
            }else{ 
                    try{
                        //check if the recieved answer is not complete
                        if(Object.keys(req.body).length == 5) await userUpdater(founcedUserName.user_id,1)
                    }catch(err){
                         res.status(500).json({'error':err.message})
                         throw err
                    }
                    db.all(`SELECT q.q_id,q.answer FROM questions AS q INNER JOIN exam(SELECT MAX(exam.exam_id)
                    ,q_id,user_id) ON q.q_id = exam.q_id WHERE exam.user_id = ? `,founcedUserName.user_id,(err,rows)=>{
                        if(err) res.status(500).json({'error':err.message})
                        let score =0;
                        const userAsnwers = [...req.body]
                        const answers = [...rows]
                        for(let i= 0;i<5;i++){
                            if(userAsnwers[i] == answers[i]) {
                                score ++
                            }
                        }
                        let exam_id = userAsnwers[0][exam_id]
                        const final_score = score/Object.keys(req.body).length
                        db.run(`UPDATE exams SET exam_score = ? WHERE exam_id = ? `,final_score,exam_id) 
                    })

            }
        }
    }
})



app.get('/:username/exam_scores',async (req,res)=>{
    const userName = req.params.username;
    const [err,founcedUserName] = await getUser(userName)
    if(err) res.status(500).json({"Error": err.message})
    else{
        if(!founcedUserName){
            res.status(404).json({"error": "this user doesn't exist"})
        }
        else{
            db.all(`SELECT DISTINCT exam_id,exam_score FROM exams WHERE user_id = ?`,founcedUserName.user_id,(err,rows)=>{
                if(err) res.status(500).json({'error':err.message})
                res.status(200).json({'exams_scores':rows})
            })
        }
        }
})


app.listen(PORT,()=>{
    console.log('server running on port 3000 ...');
})