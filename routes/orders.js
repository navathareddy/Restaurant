const { Order, validateOrders } = require("../models/orders");
const { Customer } = require("../models/customer");
const { MenuItem } = require("../models/foodMenu");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const order = await Order.find().sort("-dateOrdered");
  res.send(order);
});

router.post("/", async (req, res) => {
  console.log("hi");
  const { error } = validateOrders(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");
  console.log(customer);
  const menuItem = await MenuItem.findById(req.body.menuItemId);
  if (!menuItem) return res.status(400).send("Invalid MenuItem");
  console.log(menuItem);
  if (menuItem.available === false)
    return res.status(400).send("Item not in available.");

  let order = new Order({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    foodMenu: {
      _id: menuItem._id,
      itemName:menuItem.itemName,
      itemPrice: menuItem.itemPrice,
      available: menuItem.available,
    },
  });
  await order.save();
  res.send(order);
});

module.exports = router;
