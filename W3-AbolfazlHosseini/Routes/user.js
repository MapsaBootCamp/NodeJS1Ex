const exp = require("express")
const db = require("../config/database.js")
const {User} = require("../Models/models.js")
const userRoutes = exp.Router()


routers.post("/register",async (req,res)=>{
const userDetail = new User(req.body.username,req.body.password,req.body.email)
const repeatPass = req.body.repeatPassword
if(repeatPass != userDetail.password){
    return res.status(400).json({"message":"repeated password is not equal"})
}
if(!validateEmail(userDetail.email)){
    return res.status(400).json({"message":"invalid email format"})
}
const  checkUsernamePromise = ()=>new Promise(function(resolve,reject){
    db.get("SELECT *  FROM user WHERE username = ?",username,(err,row)=>{
 if(err)reject(err)
 resolve(row)
})
})
let checkUsername = await checkUsernamePromise()
if(!checkUsername){
    return res.json({"message":"we have such username,choose unique username"})
}
db.run("INSERT INTO user(username,password,email,token) VALUES(?,?,?,?)",userDetail.username,userDetail.password,userDetail.email,"",(err)=>{
    if(err){
        return res.status(500).json({"message":err.message})
    }
    return res.status(200).json({"message":"Done"})
})
})



routers.post("/login",(req,res)=>{
    const userDetail = new User(req.body.username,req.body.password,req.body.email)
    db.get("SELECT * FROM user WHERE username = ? AND password = ?",userDetail.username,userDetail.password,(err,row)=>{
        if(err){
            return res.status(500).json({"message":err.message})
        }
        if(!row){
            return res.status(400).json({"message":"wrong username or password"})
        }
        const token = tokenGenerator(50)
        db.run("UPDATE user SET token = ?",token,(err)=>{
            if(err){
                return res.status(500).json({"message":err.message})
            }
            return res.status(200).json({"token":token,"message":"Done"})
        })
    })
})



routers.post("/logout",async (req,res)=>{
    const token = req.body.token
        db.get("SELECT * FROM user WHERE token = ?",token,(err,row)=>{
            if(err){
                return res.status(500).json({"message":err.message})
            }
            if(!row){
                return res.status(400).json({"message":"invalid token(not authorized)"})
            }
            db.run("UPDATE user SET token = ? WHERE username = ?","",row.username,(err)=>{
                if(err){
                    return res.status(500).json({"message":err.message})
                }
                return res.status(200).json({"message":"Done"})
            })
        })
})



function validateEmail(email){
    return String(email).toLowerCase()
    .match(`/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`);
  }



function tokenGenerator(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?,./\|';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
module.exports = userRoutes