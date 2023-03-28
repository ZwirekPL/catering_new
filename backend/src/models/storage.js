const mongoose = require("mongoose");
const Item = require("./item");

const storageSchema = new mongoose.Schema(
  {
    userName: String,
    products: [Item.schema],
    editBy: String,
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

const Storage = mongoose.model("Storage", storageSchema);
module.exports = Storage;
