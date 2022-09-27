const express = require("express")
const router = express.Router()
const db = require("../config/database")
const {userExist, getResult, getState, generateQuiz} = require('../utils');


router.route("/")
  .get(async(req, res) => {  //list shomaye quizhaye mojud ro mide
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
            "quizResult": row  ///////////////////eshtebehe
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
    else if(userObj){
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

//   `UPDATE table_name
//     SET column1 = value1, column2 = value2...., columnN = valueN
//     WHERE [condition];`

  .put(async(req, res) => {    // daryafte javabe karbar
    const object = req.body;
    console.log(object);
    let i =0
    for (const key in object) {
        // if (Object.hasOwnProperty.call(object, key)) {
            console.log("round",i++);
            console.log(key);
            const value = object[key]
            console.log(value);
        // }
    }
    
    // db.run(`UPDATE Quizes
    // SET user_answer = ?
    // WHERE question_id = ?;`) 

    // db.run(`UPDATE Results
    // SET state = 1, score = ?
    // WHERE ();`)

  })
  






// router.route("/:id")
//   .get((req, res) => {  // list soalate quize morede nazar ro mide
//     const id = req.params.id;
//     db.all(`SELECT question, answer, option1, option2 from Questions WHERE quiz_number = ${id}`,(err, row) => {
//       if(err){
//           console.log(err.message);
//           return res.status(500).send(err)
//       }else{
//           return res.json({
//               "quiz": row
//           })
//       }
//     })
//   })
    

// router.route("/:username/:id")
//   .put(async (req, res) => {    //javeb azmun ersal mishe va nomre daryaft mishe

//     const username = req.params.username;    
//     const [err, userObj] = await getUser(username);
//     if(err){
//         return res.status(500).json({
//             "err": err.message
//         })
//     }else if(!userObj){
//         return res.status(400).json({
//             "err": "hamchin useri nadarim"
//         })
//     }

//     const id = req.params.id;
//     const [error, quizObj] = await getQuiz(id);
//     if(error){
//       return res.status(500).json({
//           "err": err.message
//       })
//     }else if(!quizObj[0].quiz_number){
//       return res.status(400).json({
//           "err": "hamchin quizi nadarim"
//       })
//     }    

//     if (db.get("SELECT EXISTS (SELECT user, quiz FROM Quizes WHERE user=? AND quiz=?)", [username, quizObj[0].quiz_number] )) {
//       return res.send("ghablan anjam shode") 
//       // aya darkhaste azmune jadid darid?
//     } 
//     else{
//       let score = 0;
//     for (const key in quizObj) {      
//       let userAnswer = req.body[key].user_answer
//       let point = userAnswer == quizObj[key].answer ? 1 : 0      
//       db.run(`INSERT INTO Quizes(user, question, quiz, user_answer, point) VALUES(?, ?, ?, ?, ?)`, [
//         username, quizObj[key].question_id, id, userAnswer,point]
//       )      
//       score += point
//     }
//     res.send(`javabha barresi shod, nomre azmun shoma ${score} az ${quizObj.length} mibashad`)
//     }

//   })

//   .get((req, res) => { // namayeshe histori azmun
//     db.all("SELECT * FROM Quizes WHERE user=? AND quiz=?", [req.params.username, req.params.id], (err, row) => {
//       if(err){
//           console.log(err.message);
//           return res.status(500).send(err)
//       }else{
//           return res.json({
//               "quizResult": row
//           })
//       }
//     })
//   })



// router.post("/:username/:id", (req, res) => {
  
//   db.all("SELECT * FROM Questions ORDER BY random() LIMIT 3", (err) => {
//     if(err){
//       console.log(err.message);
//       return res.status(500).send(err)
//   }else{
//       return res.json({
//           "quizResult": row
//       })
//   }
//   })
// })

  




module.exports = router