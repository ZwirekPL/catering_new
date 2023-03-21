const mongoose = require("mongoose");
import Item from "../models/item";
const itemSchema = Item;

const storageSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    userName: String,
    products: [itemSchema],
    capacity: String,
    bulkQuantity: Number,
    quantityNow: Number,
    unit: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Storage", storageSchema);
