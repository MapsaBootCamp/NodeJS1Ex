import { DataTypes } from "sequelize"

export default (sequelize)=>{
    const Question = sequelize.define('Question', {
        category : {
            type : DataTypes.STRING,
            allowNull : false
        },
        question : {
            type : DataTypes.STRING,
            allowNull : false
        },
        choice1 : {
            type : DataTypes.STRING,
            allowNull : false
        },
        choice2 : {
            type : DataTypes.STRING,
            allowNull : false
        },
        choice3 : {
            type : DataTypes.STRING,
            allowNull : false
        },
        choice4 : {
            type : DataTypes.STRING,
            allowNull : false
        },
        rightAnswer : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    }, {
        timestamps: false
    }) 
}