const mongoose = require("mongoose");
const Item = require("./item");

const storageSchema = new mongoose.Schema(
  {
    userName: { type: String },
    products: [Item.schema],
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

const Storage = mongoose.model("Storage", storageSchema);
module.exports = Storage;
