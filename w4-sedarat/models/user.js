import { DataTypes } from "sequelize"

export default (sequelize)=>{
    const User = sequelize.define('User',{
        userName : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

}
