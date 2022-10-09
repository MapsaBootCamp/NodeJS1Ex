const {DataTypes} = require('sequelize');



module.exports = (sequelize) => {
    sequelize.define('Question',{
        question_id:{
            allowNull: false,
            // autoIncrement: true,
            primaryKey:true,
            type:DataTypes.INTEGER
        },
        category:{
            allowNull:false,
            type:DataTypes.STRING
        },
        question:{
            allowNull:false,
            type:DataTypes.STRING
        },
        test1:{
            type:DataTypes.STRING
        },
        test2:{
            type:DataTypes.STRING
        },
        test3:{
            type:DataTypes.STRING
        },
        test4:{
            type:DataTypes.STRING
        },
        answer:{
            allowNull:false,
            type:DataTypes.STRING
        }
    });
}