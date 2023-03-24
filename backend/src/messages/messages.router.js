const express = require("express");
const Item = require("../models/item");
const Storage = require("../models/storage");
const {
  getAdminMessage,
  getUserItems,
  getPublicMessage,
} = require("./messages.service");
const {
  checkRequiredPermissions,
  validateAccessToken,
} = require("../middleware/auth0.middleware.js");
const { AdminMessagesPermissions } = require("./messages-permissions");

const messagesRouter = express.Router();

messagesRouter.route("/create", validateAccessToken).post((req, res) => {
  const userName = req.body.userName;
  const item = req.body.item;
  const capacity = req.body.capacity;
  const bulkQuantity = req.body.bulkQuantity;
  const quantityNow = req.body.quantityNow;
  const unit = req.body.unit;
  const newItem = new Item({
    userName,
    item,
    capacity,
    bulkQuantity,
    quantityNow,
    unit,
  });
  newItem.save();
});
messagesRouter
  .route("/delete/:idRemoveItem", validateAccessToken)
  .delete((req, res) => {
    const idRemoveItem = req.params.idRemoveItem;
    // console.log(idRemoveItem);
    Item.findById(idRemoveItem).then((doc) => {
      doc.deleteOne();
    });
  });

messagesRouter
  .route("/update/:idUpdateItem", validateAccessToken)
  .post(async (req, res) => {
    const idUpdateItem = req.params.idUpdateItem;
    const newUserName = req.body.userName;
    const newItem = req.body.item;
    const newCapacity = req.body.capacity;
    const newBulkQuantity = req.body.bulkQuantity;
    const newQuantityNow = req.body.quantityNow;
    const newUnit = req.body.unit;
    // console.log(newItem);
    const updateItem = await Item.findById(idUpdateItem).exec();
    updateItem.userName = newUserName;
    updateItem.item = newItem;
    updateItem.capacity = newCapacity;
    updateItem.bulkQuantity = newBulkQuantity;
    updateItem.quantityNow = newQuantityNow;
    updateItem.unit = newUnit;
    const updatedItem = await updateItem.save();
    // console.log(updatedItem);
    res.status(200);
  });

messagesRouter
  .route("/inventory/:userName", validateAccessToken)
  .post((req, res) => {
    // console.log("req,", req.body);
    const userName = req.params.userName;
    const inventoryArr = req.body;
    // console.log(inventory);
    const newInventory = new Storage({
      userName,
      inventoryArr,
    });
    newInventory.save();
  });

messagesRouter.get("/protected/:userName", validateAccessToken, (req, res) => {
  const userName = req.params.userName;
  // console.log(userName);
  const message = getUserItems(userName).then((data) => {
    res.status(200).json(data);
  });
});

messagesRouter.get(
  "/admin",
  validateAccessToken,
  checkRequiredPermissions([AdminMessagesPermissions.Read]),
  (req, res) => {
    const message = getAdminMessage();

    res.status(200).json(message);
  }
);

module.exports = { messagesRouter };
