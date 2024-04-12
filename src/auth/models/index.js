require("dotenv").config();
const userSchema = require("./users-model");
const DATABASE_URL = process.env.DATABASE_URL || "sqlite::memory:"; // defaults to sqlite database
const {Sequalize, Datatypes} = require("sequelize");

const sequelize = new Sequalize(DATABASE_URL);

const User = userSchema(sequelize, Datatypes);

module.exports = {
  User,
  sequelize,
};
