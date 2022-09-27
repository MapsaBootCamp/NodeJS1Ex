const express = require('express')
const db = require('./config/database')
const {getUser,examGenerator,userUpdater,lastExamFinder} = require('./utils')

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
    console.log(req.body);
    const [err,founcedUserName] = await getUser(userName)
    const lastExamId = await lastExamFinder()
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
                        //check if the recieved answer is complete then change the status of last_exam true so we have to generate new exam for the user later
                        if(Object.keys(req.body).length == 5) await userUpdater(founcedUserName.user_id,1)
                    }catch(err){
                         res.status(500).json({'error':err.message})
                         throw err
                    }
                    db.all(`SELECT q.q_id,q.answer FROM questions AS q INNER JOIN exams as e
                     ON q.q_id = e.q_id WHERE e.user_id = ? AND e.exam_id = ?`,founcedUserName.user_id,lastExamId,(err,rows)=>{
                        if(err) res.status(500).json({'error':err.message})
                        let score =0;
                        const userAsnwers = req.body
                        const answers = rows
                        console.log(rows);
                        for(let i= 0;i<Object.keys(req.body).length;i++){
                            if(userAsnwers[i+1] == answers[i].answer) {
                                score ++
                            }
                        }
                        const final_score = score/5
                        db.run(`UPDATE exams SET exam_score = ? WHERE exam_id = ? `,final_score,lastExamId,(err)=>{
                            if(err) res.status(500).json({'error':err.message})
                            else res.status(200).json({"answer":"your exam is recieved"})
                        }) 
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
            db.get(`SELECT exam_id,exam_score FROM exams WHERE user_id = ?`,founcedUserName.user_id,(err,row)=>{
                console.log(row);
                if(err) res.status(500).json({'error':err.message})
                else res.status(200).json({'exams_scores':row})
            })
        }
        }
})


app.listen(PORT,()=>{
    console.log('server running on port 3000 ...');
})