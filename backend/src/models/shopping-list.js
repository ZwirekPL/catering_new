const mongoose = require("mongoose");
const Item = require("./item");

const shoppingListSchema = new mongoose.Schema(
  {
    userName: { type: String },
    products: [Item.schema],
    status: { type: String },
    editBy: { type: String },
    category: { type: String },
    expireAt: {
      type: Date,
      default: Date.now() + 30 * 24 * 60 * 60 * 1000, // expires in 30 Day
      // required: true,
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);
module.exports = ShoppingList;
