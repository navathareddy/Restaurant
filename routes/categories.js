const auth = require("../middleware/auth");
const { Category, validateCategory } = require("../models/category");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().sort("category_Name");
  res.send(categories);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = new Category({
    category_Name: req.body.category_Name,
  });
  category = await category.save();
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      category_Name: req.body.category_Name,
    },
    { new: true }
  );
  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");
  res.send(category);
});

module.exports = router;