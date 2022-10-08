import { sequelize } from "./models/index.js";
import { questionArr } from "./models/questionsBank.js";

//Synchronizing all models at once
export async function syncDatabase(){
    try {
        await sequelize.sync({ alter: true });
        console.log("All models were synchronized successfully.");

        //filling Questions table
        await sequelize.models.Question.bulkCreate(questionArr)

    } catch (error) {
        throw error
    }
}