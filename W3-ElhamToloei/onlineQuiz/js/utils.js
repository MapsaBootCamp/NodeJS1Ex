const db = require("./config/database")

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

async function userExist(username, res) {
  const [err, userObj] = await getUser(username);
  if(err){
      return res.status(500).json({
          "err": err.message
      })
  }else if(!userObj){
      return res.status(400).json({
          "err": "hamchin useri nadarim"
      })
  }else{
      return userObj
  }
}

async function dbGetArrayOfObject(query, param){
  return new Promise(function(resolve, reject){
      db.all(query, param, function(err,rows){
          if(err){return reject(err);}
          resolve(rows);
        });
  });
} 

async function getResult(username){
  const result = [null, null]
  try{
      result[1] = await dbGetArrayOfObject("SELECT * from Results WHERE user = ?", username)
    }catch(err){
      result[0] = err
  }
  return result;
}

async function getState(username) {
  const result = [null, null]
  try{
      result[1] = await dbGetObject("SELECT * FROM Results WHERE user =? AND state = 0", username)
  }catch(err){
      result[0] = err
  }
  return result;
}

async function getQuestion(num) {
  const result = [null, null]
  try{
      result[1] = await dbGetArrayOfObject(`SELECT * FROM Questions ORDER BY random() LIMIT ${num}`)
    }catch(err){
      result[0] = err
  }
  return result;
}

async function getQuizNumber(username) {
  const result = [null, null]
  try{
      result[1] = await dbGetObject(`SELECT MAX(quiz) FROM Results WHERE user=?`, username)
    }catch(err){
      result[0] = err
  }
  return result;
}

async function makeQuizNumber(username, res) {
  const [err, quizNumberObj] = await getQuizNumber(username);
  if(err){
      return res.status(500).json({
          "err": err.message
      })
  }else{
    if(Object.values(quizNumberObj) >= 1){
        console.log("if");
        return  quizNumberObj[Object.keys(quizNumberObj)] +=1
      }
    else{
      return  quizNumberObj[Object.keys(quizNumberObj)]=1
    }
  }
}

async function generateQuiz(num, username, res) {
  const [err, questionArrObj] = await getQuestion(num);
  if(err){
      return res.status(500).json({
          "err": err.message
      })
  }else if(!questionArrObj){ //fekr konam tule araay ham bayad check beshe
      return res.status(400).json({
          "err": "bank soalat khata dare"
      })
  }else{
    db.serialize(async() => {
      const quizNumber = await makeQuizNumber(username)
      db.run("INSERT INTO Results(user, quiz) VALUES (?,?)", [username,quizNumber])

      // for (const key in questionArrObj) {        
      //     db.run("INSERT INTO Quizes(user, question_id, quiz_number) VALUES (?,?,?)", [username,questionArrObj[key].question_id,quizNumber])        
      const stmt = db.prepare("INSERT INTO Quizes(user, question_id, quiz_number) VALUES (?,?,?)");
      for (const key in questionArrObj) {  
          stmt.run([username, questionArrObj[key].question_id, quizNumber]);
      }
      stmt.finalize();
      })

      // return res.send("quiz sakhteshode")
      return res.status(200).json({
        "happiness": "quiz jadid sakhte shod",
        "quiz" : questionArrObj
      })
  }
}




// async function getQuiz(id){
//   const result = [null, null]
//   try{
//       result[1] = await dbGetArrayOfObject("SELECT * from Questions WHERE quiz_number = ?", id)
//     }catch(err){
//       result[0] = err
//   }
//   return result;
// }

  

//   async function generateQuiz(id, num) {
//     const [err, questsObj] = await getQuestion(num)
//     if(err){
//       return res.status(500).json({
//           "err": err.message
//       })
//   }else if(!questsObj){
//       return res.status(400).json({
//           "err": "bank soal khalie"
//       })
//   }
//   else{

//   }
//     db.all("SELECT * FROM Questions ORDER BY random() LIMIT 3", (err, row) => {
//         if(err){
//             console.log(err.message);
//             return res.status(500).send(err)
//         }else{
//             db.run("INSERT INTO")
//             return res.json({
//                 "quizResult": row
//             })
//         }
//     })
// }

 

  

  module.exports = {
    getUser,
    userExist,
    getResult,
    getState,
    makeQuizNumber,
    generateQuiz,
    getQuestion
    // getQuiz
  }