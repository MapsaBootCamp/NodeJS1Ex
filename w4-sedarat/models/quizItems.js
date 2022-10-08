import { DataTypes } from "sequelize"

export default (sequelize)=>{
    const QuizItem = sequelize.define('QuizItem', {
        userAnswer : {
            type : DataTypes.INTEGER,
            allowNull: true
        }}, {
        timestamps: false
    })
}