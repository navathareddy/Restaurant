const mongoose = require("mongoose");
const Joi = require("joi");


const categorySchema = new mongoose.Schema({
  category_Name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
});
const Category =  mongoose.model("Category", categorySchema);

function validateCategory(category) {
  const schema = Joi.object({
    category_Name: Joi.string().min(5).required()
    });
  return schema.validate(category);
}

exports.categorySchema = categorySchema;
exports.Category = Category; 
exports.validateCategory = validateCategory;