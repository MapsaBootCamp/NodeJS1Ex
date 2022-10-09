const { DataTypes, sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("User", {
    user_id: {
      allowNull: false,
      // autoIncrement: true,
      primarykey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
        allowNull:true,
        type:DataTypes.INTEGER
    },
  });
};
