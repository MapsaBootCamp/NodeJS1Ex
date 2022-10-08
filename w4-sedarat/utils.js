import { Op } from 'sequelize';
import {sequelize} from "./models/index.js"
const {Quiz, Question, QuizItem} = sequelize.models


export async function selectQuestionsForNewQuiz(quizRow, user_category){
    try {
        let questions;
        // if user wanted a quiz with special category
        if(user_category){
            questions = await Question.findAll({
                attributes: ['id'],
                where : {
                    category :{
                        [Op.eq] : user_category
                    } 
                },
                order: sequelize.random(),
                limit: 5 
            }) 
        }
        // if user wanted a quiz without special category
        else{
            questions = await Question.findAll({
                attributes: ['id'],
                order: sequelize.random(),
                limit: 5 
            }) 
        }
        // add selected questions to quizItems
        for(const elm of questions){
            await quizRow.addQuestion(elm, { through: { userAnswer: null } });
        }
    } catch (error) {
        throw error
    }
}

export async function getQuestions(quiz){
    try {
        const result = quiz.getQuestions({
            attributes: { exclude: ['category', 'rightAnswer'] },
            joinTableAttributes: []
        })
          return result;
    } catch (error) {
        throw error
    }
}


export async function setQuizStatus(quiz, quiz_id){
    try {
        //count notanswered questions
        const notAnswered = await QuizItem.count({
            where: {
              QuizId: quiz_id,
              userAnswer:{
                [Op.is]: null
              }
            }
          });
        if(notAnswered === 0){
            await Quiz.update({ isDone: true },{
                where :{
                    id : quiz_id,
                }
            })
            calculateRightAnswerPercent(quiz, quiz_id);
        }
    } catch (error) {
        throw error
    }
}


export async function calculateRightAnswerPercent(quiz,quiz_id){
    try {
        const userAnswersAndRightAnswers = await quiz.getQuestions({
            attributes:['rightAnswer'],
            joinTableAttributes: ['userAnswer'] 
        });
        //count right answered questions
        let rightAnswerCount = 0;
        for(const elm of userAnswersAndRightAnswers){
            if(elm.rightAnswer === elm.QuizItem.userAnswer)
                rightAnswerCount++
        }
        let percentage = (rightAnswerCount * 100)/5
        await Quiz.update({
            rightAnswerPercent : percentage
        },{
            where : {
                id : quiz_id
            }
            })
    } catch (error) {
        throw error
    }
}