const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const userSchema = new mongoose.Schema({
  user_Name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 300,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 2000,
  },
});
userSchema.methods.generateAuthToken = function () {
  console.log("hi");
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);


function validateUser(user) {
  const schema = Joi.object({
    user_Name: Joi.string().min(5).required(),
    email: Joi.string().min(5).max(300).required().email(),
    password: Joi.string().min(5).max(2000).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
exports.userSchema = userSchema;
