const express = require("express")
const router = express.Router()

const db = require("../config/database")

router.route("/")
  .get((req, res) => {
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
  .get((req, res) => {
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
    






async function dbGetObject(query, param){
  return new Promise(function(resolve, reject){
      db.get(query, param, function(err,rows){
          if(err){return reject(err);}
          resolve(rows);
        });
  });
}  
  
async function getUser(username){
  const result = [null, null]
  try{
      result[1] = await dbGetObject("SELECT username FROM Users WHERE username=?", username)
  }catch(err){
      result[0] = err
  }
  return result;
}

async function getQuiz(id){
  const result = [null, null]
  try{
      result[1] = await dbGetObject("SELECT question_id, question, answer, option1, option2 from Questions WHERE quiz_number = ?",
                                       id)
    }catch(err){
      result[0] = err
  }
  return result;
}


router.route("/:username/:id")
  .put(async (req, res) => {
    const username = req.params.username;
    const id = req.params.id;
    
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

    const [error, quizObj] = await getQuiz(id);
    if(error){
      return res.status(500).json({
          "err": err.message
      })
    }else if(!quizObj){
      return res.status(400).json({
          "err": "hamchin quizi nadarim"
      })
    }    
  
    const userAnswer = req.body.user_answer
    const point = userAnswer == quizObj.answer ? 1 : 0
    
    db.run(`INSERT INTO Quizes(user, question, quiz, user_answer, point) VALUES(?, ?, ?, ?, ?)`, [
      username, quizObj.question_id, id, userAnswer,point], (err) => {
      if(error) return res.status(500).json({"err": error.message})
      return res.send(`javab add shod, emtiaze in soale shoma ${point} mibashad`)
    })
    
  })


  
// //   .put((req, res) => {
// //     res.send('Update the book')
// //   })







module.exports = router