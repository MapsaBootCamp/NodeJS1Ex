import { Router } from "express";
import {sequelize} from "../models/index.js"
const {User, Quiz, Question, QuizItem} = sequelize.models
const router = Router();

router
    .route("/")

    //get history for all users
        .get(async(req, res)=>{
            try {
                const userQuizHistory = await User.findAll({
                    attributes : ['id', 'userName'],
                    include: {
                        model : Quiz,
                        required: true,
                        attributes : ['id','rightAnswerPercent']
                    }
                });
                res.send(userQuizHistory)
            } catch (error) {
                throw error
            }
        })
router
    .route("/:id")
//get history for special user
        .get(async(req, res)=>{
            try {
                const userQuizHistory = await User.findAll({
                    attributes : ['id', 'userName'],
                    where :{
                        id : req.params.id
                    },
                    include: {
                        model : Quiz,
                        required: true,
                        attributes : ['id','rightAnswerPercent']
                    }
                });
                res.send(userQuizHistory)
            } catch (error) {
                throw error
            }
        })

export {router}