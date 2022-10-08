
import { oneToManyRelation, superManyToManyRelation} from "./associations.js"
import { Sequelize } from "sequelize";
import {default as userModel} from "./user.js"
import {default as quizModel} from "./quiz.js"
import {default as questionsModel} from "./questions.js"
import {default as quizItemsModel} from "./quizItems.js"
       
// Connecting to a database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'online-quiz.sqlite',
    logging: false
});

//Testing the connection
(async function connectionAuthenticate(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

//Model Definition
const modelDefines = [
    userModel,
    quizModel,
    questionsModel,
    quizItemsModel,
]
for(const modelDefiner of modelDefines){
    modelDefiner(sequelize)
}

// set associations
oneToManyRelation(sequelize.models.User, sequelize.models.Quiz)
superManyToManyRelation(sequelize.models.Quiz, sequelize.models.Question, sequelize.models.QuizItem)


export {sequelize}