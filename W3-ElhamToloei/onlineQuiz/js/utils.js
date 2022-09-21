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
  
  
  
  async function dbGetArrayOfObject(query, param){
    return new Promise(function(resolve, reject){
        db.all(query, param, function(err,rows){
            if(err){return reject(err);}
            resolve(rows);
          });
    });
  } 
  async function getQuiz(id){
    const result = [null, null]
    try{
        result[1] = await dbGetArrayOfObject("SELECT * from Questions WHERE quiz_number = ?", id)
      }catch(err){
        result[0] = err
    }
    return result;
  }
  

  module.exports = {
    getUser,
    getQuiz
  }