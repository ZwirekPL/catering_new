const express = require("express");
const Item = require("../models/item");
const Storage = require("../models/storage");
const ShoppingList = require("../models/shopping-list");
const ShoppingItem = require("../models/shopping-list-item");
const {
  getUserItems,
  getInventoryHistory,
  getShoppingListHistory,
  getShoppingListItems,
} = require("./messages.service");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

const messagesRouter = express.Router();

messagesRouter.route("/create", validateAccessToken).post((req, res) => {
  const userName = req.body.userName;
  const item = req.body.item;
  const capacity = req.body.capacity;
  const bulkQuantity = req.body.bulkQuantity;
  const quantityNow = req.body.quantityNow;
  const unit = req.body.unit;
  const editBy = req.body.editBy;
  const category = req.body.category;
  const newItem = new Item({
    userName,
    item,
    capacity,
    bulkQuantity,
    quantityNow,
    unit,
    editBy,
    category,
  });
  newItem.save();
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
    const newEditBy = req.body.editBy;
    const newCategory = req.body.category;
    const updateItem = await Item.findById(idUpdateItem).exec();
    updateItem.userName = newUserName;
    updateItem.item = newItem;
    updateItem.capacity = newCapacity;
    updateItem.bulkQuantity = newBulkQuantity;
    updateItem.quantityNow = newQuantityNow;
    updateItem.unit = newUnit;
    updateItem.editBy = newEditBy;
    updateItem.category = newCategory;
    const updatedItem = await updateItem.save();
    res.status(200);
  });

messagesRouter
  .route("/inventory/send/:userName", validateAccessToken)
  .post((req, res) => {
    const userName = req.params.userName;
    const products = req.body.data;
    const editBy = req.body.editUser;
    const category = req.body.category;
    const newInventory = new Storage({
      userName,
      products,
      editBy,
      category,
    });
    newInventory.save();
  });

messagesRouter
  .route("/shopping/send/:userName", validateAccessToken)
  .post((req, res) => {
    const userName = req.params.userName;
    const products = req.body.data;
    const productsLength = products.length - 1;
    const editBy = req.body.editUser;
    const category = req.body.category;
    const newInventory = new ShoppingList({
      userName,
      products,
      editBy,
    });
    // const newShoppingItem = ShoppingItem.insertMany(products)
    //   .then(function () {
    //     console.log("Successfully saved many items to DB");
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });

    const items = products.map((product) => {
      getShoppingListItems(product.item).then((result) => {
        console.log("1", result);
        return result;
      });
    });

    newInventory.save();
  });
messagesRouter
  .route("/delete/:idRemoveItem", validateAccessToken)
  .delete((req, res) => {
    const idRemoveItem = req.params.idRemoveItem;
    Item.findById(idRemoveItem).then((doc) => {
      doc.deleteOne();
    });
  });

//
messagesRouter
  .route("/inventory/get/:userName", validateAccessToken)
  .get((req, res) => {
    const userName = req.params.userName;
    const message = getInventoryHistory(userName).then((data) => {
      res.status(200).json(data);
    });
  });

messagesRouter
  .route("/shopping/get/:userName", validateAccessToken)
  .get((req, res) => {
    const userName = req.params.userName;
    // console.log(userName);
    const message = getShoppingListHistory(userName).then((data) => {
      // console.log(data);
      // console.log(data[0].products);
      res.status(200).json(data);
    });
  });

messagesRouter.get("/protected/:userName", validateAccessToken, (req, res) => {
  const userName = req.params.userName;
  // console.log(userName);
  const message = getUserItems(userName).then((data) => {
    res.status(200).json(data);
  });
});

module.exports = { messagesRouter };
