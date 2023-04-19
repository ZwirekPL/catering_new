const mongoose = require("mongoose");

const shoppingItemSchema = new mongoose.Schema(
  {
    userName: { type: String },
    item: { type: String, lowercase: true },
    capacity: { type: String },
    bulkQuantity: { type: Number },
    quantityNow: { type: Number },
    unit: { type: String },
    editBy: { type: String },
    category: { type: String },
    expireAt: {
      type: Date,
      default: Date.now() + 30 * 24 * 60 * 60 * 1000, // expires in 30 Day
      // required: true,
    },
  },
  { timestamps: true }
);
const ShoppingItem = mongoose.model("ShoppingItem", shoppingItemSchema);
module.exports = ShoppingItem;
