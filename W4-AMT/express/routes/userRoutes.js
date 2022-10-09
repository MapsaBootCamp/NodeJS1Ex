const express = require("express");
const { body } = require("express-validator");
const user = require("../../config/models/user");
const {User} = require("../../config/models/user");

const router = express.Router();


router.route("/account").post([body('username').not().isEmpty().trim().isLength({min:4})]),
async(req,res) =>{
  try {
    const profile = await User.create({
      User: req.body,
    },{
        include:[User]
    })
    return res.status(200).send({"status": user})
  } catch (error) {
    return res.status(400).send(error)
    
  }
}

module.exports = router;
