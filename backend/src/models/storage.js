const mongoose = require("mongoose");
const Item = require("./item");

const storageSchema = new mongoose.Schema(
  {
    userName: String,
    products: [Item.schema],
  },
  { timestamps: true }
);

const Storage = mongoose.model("Storage", storageSchema);
module.exports = Storage;
