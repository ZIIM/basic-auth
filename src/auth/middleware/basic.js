const bcrypt = require("bcrypt"); // pw hashing
const base64 = require("base-64"); // pw encoding
const {User, sequelize} = require("../models");

User.beforeCreate(async function (user){
  user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
});

const signUp = async(req, res, next) => {
  try {
    const record = await User.create(req.body);
    if(record){
      next();
    } else {
      next("Unable to sign up.");
    }
  } catch (error) {
    res.status(403).send("Invalid Sign Up");
  }
};

const basicAuth = async (req, res, next) => {
  let basicHeaderParts = req.headers.authorization.split(" ");
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(":"); // splits username and password to be seen seperatly to look at them indiv.

  try {
    const user = await User.findOne({where: {username: username} });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (valid){
      next();
    } else {
      next("Invalid User");
    } 
  } catch (error){
    res.status(403).send("invalid login");
  }
};

module.exports = {
  basicAuth,
  signUp,
};