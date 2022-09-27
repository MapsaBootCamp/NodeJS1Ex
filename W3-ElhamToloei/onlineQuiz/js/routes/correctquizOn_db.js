const express = require("express")
const router = express.Router()
const db = require("../config/database")
const {getUser, getQuiz} = require('../utils');

router.route("/")
  .get((req, res) => {  //list shomaye quizhaye mojud ro mide
    db.all("SELECT DISTINCT quiz_number FROM Questions" ,(err, row) => {
      if(err){
          console.log(err.message);
          return res.status(500).send(err)
      }else{
          return res.json({
              "quizList": row
          })
      }
    })
    // res.send('Get a random quiz')
  })

  // .post((req, res) => {
  //   res.send('Add a quiz')
  // })
  

router.route("/:id")
  .get((req, res) => {  // list soalate quize morede nazar ro mide
    const id = req.params.id;
    db.all(`SELECT question, answer, option1, option2 from Questions WHERE quiz_number = ${id}`,(err, row) => {
      if(err){
          console.log(err.message);
          return res.status(500).send(err)
      }else{
          return res.json({
              "quiz": row
          })
      }
    })
  })
    

router.route("/:username/:id")
  .put(async (req, res) => {    //javeb azmun ersal mishe va nomre daryaft mishe

    const username = req.params.username;    
    const [err, userObj] = await getUser(username);
    if(err){
        return res.status(500).json({
            "err": err.message
        })
    }else if(!userObj){
        return res.status(400).json({
            "err": "hamchin useri nadarim"
        })
    }

    const id = req.params.id;
    const [error, quizObj] = await getQuiz(id);
    if(error){
      return res.status(500).json({
          "err": err.message
      })
    }else if(!quizObj[0].quiz_number){
      return res.status(400).json({
          "err": "hamchin quizi nadarim"
      })
    }    

    if (db.get("SELECT EXISTS (SELECT user, quiz FROM Quizes WHERE user=? AND quiz=?)", [username, quizObj[0].quiz_number] )) {
      return res.send("ghablan anjam shode") 
      // aya darkhaste azmune jadid darid?
    } 
    else{
      let score = 0;
    for (const key in quizObj) {      
      let userAnswer = req.body[key].user_answer
      let point = userAnswer == quizObj[key].answer ? 1 : 0      
      db.run(`INSERT INTO Quizes(user, question, quiz, user_answer, point) VALUES(?, ?, ?, ?, ?)`, [
        username, quizObj[key].question_id, id, userAnswer,point]
      )      
      score += point
    }
    res.send(`javabha barresi shod, nomre azmun shoma ${score} az ${quizObj.length} mibashad`)
    }

  })

  .get((req, res) => { // namayeshe histori azmun
    db.all("SELECT * FROM Quizes WHERE user=? AND quiz=?", [req.params.username, req.params.id], (err, row) => {
      if(err){
          console.log(err.message);
          return res.status(500).send(err)
      }else{
          return res.json({
              "quizResult": row
          })
      }
    })
  })





module.exports = router