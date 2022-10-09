const sequelize = require('./config')
const {questionRecords} = require('./config/questionBank.js')
const  { Question }  = sequelize.models
console.log('start to sync DB...');

(async function setup(){
    try {
        await sequelize.sync({alter:true})
            await Question.bulkCreate(questionRecords)
        console.log("db sync shod")
    } catch (error) {
        console.log(error)
    }
})()

