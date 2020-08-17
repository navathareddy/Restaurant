const categorySchema = require("./category");
const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");


const MenuItem = mongoose.model(
  "MenuItem",
  new mongoose.Schema({
    itemName: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 30,
    },
    category: {
      type: categorySchema,
      required: true,
    },
    itemPrice: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    available: {
      type: Boolean,
      default: false,
    },
  })
);

function validateMenuItems(items) {
  const schema = Joi.object({
    itemName: Joi.string().min(5).max(30).required(),
    categoryId: Joi.string().required(),
    itemPrice: Joi.number().min(0).max(100).required(),
    available: Joi.boolean().required(),
  });
  return schema.validate(items);
}

exports.MenuItem = MenuItem;
exports.validateMenuItems = validateMenuItems;
