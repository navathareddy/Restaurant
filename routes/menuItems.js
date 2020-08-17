const { MenuItem, validateMenuItems } = require("../models/foodMenu");
const { Category } = require("../models/category");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {

  const menuItems = await MenuItem.find().sort("itemName");
  res.send(menuItems);
});

router.post("/", async (req, res) => {
  const { error } = validateMenuItems(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if(!mongoose.Types.ObjectId.isValid((req.body.categoryId)))
  return res.status(400).send("Invalid category.");

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  let menuItem = new MenuItem({
    itemName: req.body.itemName,
    category: {
      _id: category._id,
      name: category.category_Name,
    },
    itemPrice: req.body.itemPrice,
    available: req.body.available,
  });
  menuItem = await menuItem.save();

  res.send(menuItem);
});

router.put("/:id", async (req, res) => {
  const { error } = validateMenuItems(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  const foodItem = await MenuItem.findByIdAndUpdate(
    req.params.id,
    {
      itemName: req.body.itemName,
      category: {
        _id: category._id,
        name: category.category_Name,
      },
      itemPrice: req.body.itemPrice,
      available: req.body.available,
    },
    { new: true }
  );
  if (!foodItem)
    res.status(404).send("The MenuItem with the given ID was not found.");

  res.send(foodItem);
});

router.delete("/:id", async (req, res) => {
  const foodItem = await MenuItem.findByIdAndRemove(req.params.id);
  if (!foodItem)
    res.status(404).send("The MenuItem with the given ID was not found.");

  res.send(foodItem);
});
router.get("/:id", async (req, res) => {
  const foodItem = await MenuItem.findById(req.params.id);

  if (!foodItem)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(foodItem);
});

module.exports = router;
