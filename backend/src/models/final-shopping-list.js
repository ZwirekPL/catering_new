const mongoose = require("mongoose");
const Item = require("./item");

const finalShoppingListSchema = new mongoose.Schema(
  {
    userName: String,
    products: [Item.schema],
    status: String,
    editBy: String,
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

const FinalShoppingList = mongoose.model(
  "FinalShoppingList",
  finalShoppingListSchema
);
module.exports = FinalShoppingList;
