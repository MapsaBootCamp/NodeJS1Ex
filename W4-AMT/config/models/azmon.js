const {DataTypes, INTEGER} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("azmon", {
        azmon_id:{
            allowNull:false,
            // autoIncrement:true,
            primaryKey:true,
            type:DataTypes.INTEGER
        },
        user:{
            allowNull:false,
            type:DataTypes.STRING
        },
        situation:{
            allowNull:true,
            type:DataTypes.BOOLEAN
        },
        percent:{
            type:DataTypes.INTEGER
        }
    })
}