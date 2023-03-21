const express = require("express");
const itemRouter = express.Router();
const Item = require("../models/item");

itemRouter.route("/create").post((req, res) => {
  const userName = req.body.userName;
  const item = req.body.item;
  const capacity = req.body.capacity;
  const bulkQuantity = req.body.bulkQuantity;
  const quantityNow = req.body.quantityNow;
  const unit = req.body.unit;
  const newItem = new Item({
    userName,
    item,
    capacity,
    bulkQuantity,
    quantityNow,
    unit,
  });
  newItem.save();
});

module.exports = itemRouter;
//nie działa
