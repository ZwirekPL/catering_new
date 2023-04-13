const mongoose = require("mongoose");

const shoppingItemSchema = new mongoose.Schema(
  {
    userName: { type: String },
    item: { type: String },
    capacity: { type: String },
    bulkQuantity: { type: Number },
    quantityNow: { type: Number },
    unit: { type: String },
    editBy: { type: String },
  },
  { timestamps: true }
);
const ShoppingItem = mongoose.model("ShoppingItem", shoppingItemSchema);
module.exports = ShoppingItem;
