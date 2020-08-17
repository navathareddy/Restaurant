const Joi = require("joi");
const mongoose = require("mongoose");
const joiObjectid = require("joi-objectid");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
      }),
    },

    foodMenu: {
      type: new mongoose.Schema({
        itemName: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 30,
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
          }
      })
    },
    dateOrdered: {
      type: Date,
      required: true,
      dafault: Date.now,
    },
  })
);

function validateOrders(order) {
  const schema = Joi.object({
    customerId: Joi.objectId(),
    menuItemId: joiObjectid().required(),
  });
  return schema.validate(order);
}

exports.validateOrders =validateOrders;
exports.Order=Order;
