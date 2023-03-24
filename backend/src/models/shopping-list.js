const mongoose = require("mongoose");
const Item = require("./item");

const shoppingListSchema = new mongoose.Schema(
  {
    userName: String,
    products: [Item.schema],
    expireAt: {
      type: Date,
      default: Date.now() + 24 * 60 * 60 * 1000, // expires in 1 Day
      // required: true,
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);
module.exports = ShoppingList;
