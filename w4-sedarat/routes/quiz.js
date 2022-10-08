import { Router } from "express";
import {sequelize} from "../models/index.js"
import { selectQuestionsForNewQuiz, getQuestions, setQuizStatus } from "../utils.js";
const {User, Quiz, Question, QuizItem} = sequelize.models
const router = Router();

router
    .route("/")

//get categories
        .get(async(req, res)=>{
            try {
                const categories = await Question.findAll({
                    attributes:[sequelize.literal('distinct `category`'),'category']
                })
                res.send(categories)
            } catch (error) {
                throw error
            }
        })
 
router        
    .route("/:id")
//get questions
        .get(async(req, res)=>{
            try {            
                const isexist = await User.count({where :{id : req.params.id}})
                if(isexist === 0){return res.send("this user not exist or deleted already")}
                const [row, created] = await Quiz.findOrCreate({
                    where: { 
                        UserId: req.params.id,
                        isDone : false 
                    },
                    defaults: {rightAnswerPercent : 0}
                  });
                 if(created){
                    await selectQuestionsForNewQuiz(row , req.body.category);
                 }
                 const questions = await getQuestions(row);
                res.send(questions);
            } catch (error) {
                throw error   
            }         
        })

//recorded answers
        .post(async(req, res)=>{
            try {
                const quiz = await Quiz.findOne({
                    attributes : ['id'],
                    where: { 
                        UserId: req.params.id,
                        isDone : false 
                    }})
                for(const elm of req.body){
                    await QuizItem.update({ userAnswer: elm.answer },{
                        where :{
                            QuizId : quiz.id,
                            QuestionId : elm.qusetionId
                        }
                    })
                }
                await setQuizStatus(quiz, quiz.id);
                res.send("your answers is recorded")
            } catch (error) {
                throw error
            }    
        })

export {router}