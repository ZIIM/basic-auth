const { Sequelize } = require("sequelize");

const User = (Sequelize, DataTypes) => {
  return Sequelize.define("User", {
    username:{
      type: DataTypes.STRING,
      // allowNull means fields cant be empty
      allowNull:false,
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false,
    },
  });
};

module.exports = User;