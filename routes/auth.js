const config = require("config");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  //console.log(user.password)
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  //console.log(validPassword);

  if (!validPassword) return res.status(400).send("Invalid email or password");
  const token = user.generateAuthToken();
  res.send(token);
});

function validateAuth(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
}

module.exports = router;
