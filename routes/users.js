const { User, validateUser } = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");

router.get("/:id",)

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");
  //  user = new User({
  //   user_Name: req.body.user_Name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });

  user = new User(_.pick(req.body, ["user_Name", "email", "password"]));

  const salt = await bcrypt.genSalt(10); // basic value used -10
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token =user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "user_Name", "email"]));
});

module.exports = router;
