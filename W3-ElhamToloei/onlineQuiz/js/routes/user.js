const express = require("express")
const db = require("../config/database")
const router = express.Router()

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
        if(!req.body.username){
            return res.status(400).json({
                "err": "username field is required!"
            })
        }else{

            db.run(`INSERT INTO Users(username) VALUES(?)`, [req.body.username]
            , (err) => {
                if(err) return res.status(400).json({"errMessage": err.message})
                // sakhte azmune pishfarz aya?
                return res.status(201).json(
                    {
                        "messgae": "user created",
                        "data": req.body.username
                    }
                )
            }) 
        }
    })


// // const {getUser} = require("../utils")
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


// router.put("/:id", async (req, res) => {
//     const id = req.params.id;
//     const [err, userObj] = await getUser(id);
//     if(err){
//         return res.status(500).json({
//             "err": err.message
//         })
//     }else if(!userObj){
//         return res.status(400).json({
//             "err": "hamchin useri nadarim"
//         })
//     }
//     const oldPassword = userObj.password;
//     const newPassword = req.body.password ? req.body.password : oldPassword
//     db.run(`UPDATE users SET password=? WHERE user_id=?`, [newPassword, id], (err) => {
//         if(err) return res.status(500).json({"err": err.message})
//         return res.send(`${userObj.username} succesfully updatede`)
//     })

// })

// router.delete("/:id", async (req, res) => {
//     const id = req.params.id;
//     const [err, userObj] = await getUser(id);
//     if(err){
//         return res.status(500).json({
//             "err": err.message
//         })
//     }else if(!userObj){
//         return res.status(400).json({
//             "err": "hamchin useri nadarim"
//         })
//     }
//     db.run(`DELETE FROM users WHERE user_id=?`, id, (err, obj) => {
//         if(err){
//             return res.status(400).json({
//                 "err": err.message
//             })
//         }else{
//             console.log(obj);
//             return res.send(`succesfully deleted`)
//         }
//     })
// })

module.exports = router