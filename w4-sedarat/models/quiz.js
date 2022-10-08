import { DataTypes } from "sequelize"

export default (sequelize)=>{
    const Quiz = sequelize.define('Quiz', {
        isDone : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        rightAnswerPercent : {
            type : DataTypes.INTEGER,
            defaultValue : 0
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
}    