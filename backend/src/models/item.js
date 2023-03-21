const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userName: { type: String, required: true },
    productName: { type: String, required: true },
    capacity: { type: String, required: true },
    bulkQuantity: { type: Number, required: true },
    quantityNow: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
