const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    userName: { type: String },
    item: { type: String },
    capacity: { type: String },
    bulkQuantity: { type: Number },
    quantityNow: { type: Number },
    unit: { type: String },
  },
  { timestamps: true }
);
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
