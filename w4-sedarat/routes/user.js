import { Router } from "express";
import {sequelize} from "../models/index.js"
const {User} = sequelize.models
const router = Router();

router
    .route("/")
    
//get all users
        .get(async(req, res)=>{
            try {
                const users = await User.findAll({
                    attributes : ['userName']
                })
                res.send(users)
            } catch (error) {
                throw error
            }
        })

//create new user
        .post(async(req, res)=>{
            try {            
                const isexist = await User.count({where :{userName : req.body.userName}})
                if(isexist === 0){
                    const result = await User.create(req.body);
                    return res.send(`user ${result.userName} created successfully`)
                }
                else{
                    res.send("this username is exist")
                }
            } catch (error) {
                throw error   
            }       
         })
 
router        
    .route("/:id")
//get user information
        .get(async(req, res)=>{
            try {
                const isexist = await User.count({where :{id : req.params.id}})
                if(isexist !== 0){
                    const result = await User.findByPk(req.params.id);
                    res.send(result)
                }
                else{
                    res.send("this user is not exist")
                }
            } catch (error) {
                throw error
            }
        })

// change password
        .put(async(req, res)=>{       
            try {
                const isexist = await User.count({where :{id : req.params.id}})
                if(isexist !== 0){
                    await User.update(req.body, {
                        where: {
                        id: req.params.id,
                        },
                        fields: ['password']
                    });
                    res.send("your password successfully changed")
                }
                else{
                    res.send("this user not exist")
                }
            } catch (error) {
                throw error
            }     
        })

// delete user
        .delete(async(req, res)=>{
            try {
                const isexist = await User.count({where :{id : req.params.id}})
                if(isexist !== 0){
                    await User.destroy({
                        where: {
                        id: req.params.id,
                        },
                    });
                    res.send("this user deleted successfully")
                }
                else{
                    res.send("this user not exist")
                }
            } catch (error) {
                throw error
            }
        })


export {router}