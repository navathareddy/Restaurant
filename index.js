const config=require('config')
const Joi=require('joi')
Joi.objectId=require('joi-objectid')(Joi)
const mongoose = require("mongoose");
const categories = require("./routes/categories");
const menuItems = require("./routes/menuItems");
const customers=require('./routes/customers')
const auth=require('./routes/auth')
const express = require("express");
const orders= require('./routes/orders')
const users=require('./routes/users')
const app = express();

if(!config.get('jwtPrivateKey')){
console.error('Fatal Error:jwtPrivateKey is not defined')
process.exit(1)
}

mongoose
  .connect("mongodb://localhost/Restaraunt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

  app.use(express.json());
  app.use('/api/categories', categories);
  app.use('/api/customers', customers);
  app.use('/api/menuItems', menuItems);
  app.use('/api/orders',orders)
  app.use('/api/users',users)
  app.use('/api/auth',auth)
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}...`));