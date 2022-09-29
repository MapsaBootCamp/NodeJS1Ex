const express = require("express")
const router = express.Router()
const db = require("../config/database")
const {userExist, getResult, getState, generateQuiz, getQuizNumber} = require('../utils');


router.route("/")
  .get(async(req, res) => {  //list quizhaye mojud ro mide
    const username = req.body.username;    
    await userExist(username, res)
    
    const [err, resultObj] = await getResult(username);
    if(err){
        return res.status(500).json({
            "err": err.message
        })
    }else if(!resultObj || resultObj.length == 0){
        return res.status(400).json({
            "err": "tahala azmun nadaddi"
        })
    }
    else{
        console.log(resultObj);

        return res.json({
            "quizResult": resultObj  
        })
    }
  })

  .post(async(req, res) => {   //ijad va namayeshe quiz
    const username = req.body.username;    // inja dge url nadarim k bekhahim id ina tu address bezarim az karbar begirim tu body migirim  
    await userExist(username, res);

    const [err, userObj] = await getState(username);
    if(err){
        return res.status(500).json({
            "err": err.message
        })
    }
    else if(userObj){   //bug: poshte ham k request bezani hamun azmun ro poshte ham tekrar mikone
        db.all(`SELECT Quizes.question_id, question, option1, option2, option3, option4 FROM Questions
                INNER JOIN Quizes ON Questions.question_id = Quizes.question_id`, (err, row) => {
                    if(err){
                        return res.status(500).send(err)
                    }else{
                        return res.json({
                            "err": "azmune anjam nashode darid",
                            "note": "ebteda azmun zir ra anjam dahid",
                            "quiz": row
                        })
                    }
        })

    }else{        //generate new guiz 
        await generateQuiz(3, username, res); 
    }
  })

  .put(async(req, res) => {    // daryafte javabe karbar
    const username = req.body.username
    const [err, quizNumberObj] = await getQuizNumber(username);
    if(err){
        return res.status(500).json({
            "err": err.message
        })
    }else{
        db.serialize(async() => {
            const stmt = db.prepare(`UPDATE Quizes SET user_answer = (?) WHERE user=(?) AND question_id = (?) AND quiz_number=(?)`);
                for (const key in req.body) {
                    stmt.run([`option${req.body[key]}`, username, key, quizNumberObj[Object.keys(quizNumberObj)]]);
                }
            stmt.finalize();
            //mishe ghable in k bezarim tu db moghayese konim
            db.all(`SELECT Quizes.question_id, correct_answer, user_answer FROM Questions
            INNER JOIN Quizes ON Questions.question_id = Quizes.question_id WHERE user= ? AND quiz_number=?`,
                [username, quizNumberObj[Object.keys(quizNumberObj)]], (err, row) => {
                if(err){
                    return res.status(500).send(err)
                }else{
                    let score = 0
                    for (let i = 0; i < row.length; i++) {
                        if (row[i].correct_answer === row[i].user_answer) {
                            score += 10                        
                        }                    
                    }
                    const total = (row.length + 0) * 10     // +1 nemikonim chon araye ye username ezafe dare
                    db.run(`UPDATE Results SET score = ? , state = 1 WHERE user =? AND quiz =?`,[score, username, quizNumberObj[Object.keys(quizNumberObj)]])
                    return res.json({
                        "note": "natije moghayeswie azmun",
                        "score": `${score}/${total}`, 
                        "compare": row
                    })
                }
            })
        })
    }
    // return res.status(200).json({
    //     "happiness": "javab ha daryaft shod"
    //   })
  })
  

module.exports = router