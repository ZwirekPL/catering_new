const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    userName: { type: String },
    item: { type: String, lowercase: true },
    capacity: { type: String },
    bulkQuantity: { type: Number },
    quantityNow: { type: Number },
    unit: { type: String },
    editBy: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
