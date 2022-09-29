const express = require("express")
const db = require("../config/database")
const router = express.Router()
const {userExist} = require('../utils');

router.route("/")
    .get((req, res) => {
        db.all("SELECT username FROM Users", (err, row) => {
            if(err){
                console.log(err.message);
                throw err
            }else{
                return res.json({
                    "Users": row
                })
            }
        })
    })
    
    .post((req, res) => {
        const username = req.body.username
        if(!username){
            return res.status(400).json({
                "err": "username field is required!"
            })
        }else{

            db.run(`INSERT INTO Users(username) VALUES(?)`, [username], (err) => {
                if(err) return res.status(400).json({"errMessage": err.message})
                // sakhte azmune pishfarz aya? fkr nakonam bekhad
                return res.status(201).json(
                    {
                        "messgae": "user created",
                        "data": req.body.username
                    }
                )
            }) 
        }
    })

    .put(async (req, res) => {
        const username = req.body.username
        const userObj = await userExist(username, res);
        const oldEmail = userObj.email;
        const newEmail = req.body.email ? req.body.email : oldEmail
        db.run(`UPDATE Users SET email=? WHERE username=?`, [newEmail, username], (err) => {
            if(err) return res.status(500).json({"err": err.message})
            return res.send(`${userObj.username} succesfully updatede`)
        })
    })
        
    .delete(async (req, res) => {
        const username = req.body.username
        await userExist(username, res);
        db.run(`DELETE FROM users WHERE username=?`, username, (err, obj) => {
            if(err){
                return res.status(400).json({
                    "err": err.message
                })
            }else{
                console.log(obj);
                return res.send(`succesfully deleted`)
            }
        })
    })

// router.get("/:id", async (req, res) => {
//     const id = req.params.id;
//     const [err, userObj] = await getUser(id);
//         if(err){
//             return res.status(500).json({
//                 "err": err.message
//             })
//         }else{
//             if(userObj){
//                 return res.send(userObj)
//             }else{
//                 return res.status(404).json({
//                     "err": "hamchin useri nadarim"
//                 })
//             }
//         }
// })

module.exports = router