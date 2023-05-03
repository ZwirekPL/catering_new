const express = require("express");
const Item = require("../models/item");
const Storage = require("../models/storage");
const ShoppingList = require("../models/shopping-list");
const ShoppingItem = require("../models/shopping-list-item");
const {
  getUserItems,
  getInventoryHistory,
  getShoppingListHistory,
  getShoppingListDrivers,
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
  res.status(200);
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
    res.status(200);
  });

messagesRouter
  .route("/shopping/send/:userName", validateAccessToken)
  .post(async (req, res) => {
    const userName = req.params.userName;
    const products = req.body.data;
    const editBy = req.body.editUser;
    const category = req.body.category;
    const newInventory = new ShoppingList({
      userName,
      products,
      editBy,
      category,
    });
    const updateDriverList = async (products) => {
      const currentList = await ShoppingItem.find({});
      const result = Object.values(
        [...currentList, ...products].reduce(
          (
            acc,
            {
              userName,
              item,
              capacity,
              bulkQuantity,
              quantityNow,
              unit,
              editBy,
              category,
            }
          ) => {
            acc[item] = {
              userName,
              item,
              capacity,
              bulkQuantity,
              quantityNow:
                (acc[item] ? parseInt(acc[item].quantityNow) : 0) +
                parseInt(quantityNow),
              unit,
              editBy,
              category,
            };
            return acc;
          }
        )
      );
      const updateDriverItem = async (props) => {
        const userName = props.userName;
        const item = props.item;
        const capacity = props.capacity;
        const bulkQuantity = props.bulkQuantity;
        const quantityNow = props.quantityNow;
        const unit = props.unit;
        const editBy = props.editBy;
        const category = props.category;
        await ShoppingItem.findOneAndUpdate(
          { item: item },
          {
            userName,
            item,
            capacity,
            bulkQuantity,
            quantityNow,
            unit,
            editBy,
            category,
          },
          {
            new: true,
            upsert: true,
          }
        );
      };
      result.map((props) => {
        updateDriverItem(props);
      });
    };
    await updateDriverList(products);
    await newInventory.save();
    res.status(200);
  });

messagesRouter
  .route("/shopping/update/:idUpdateItem", validateAccessToken)
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
    const updateItem = await ShoppingItem.findById(idUpdateItem).exec();
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
  .route("/shopping/delete/:idRemoveItem", validateAccessToken)
  .delete((req, res) => {
    const idRemoveItem = req.params.idRemoveItem;
    ShoppingItem.findById(idRemoveItem).then((doc) => {
      doc.deleteOne();
      res.status(200);
    });
  });

messagesRouter
  .route("/delete/:idRemoveItem", validateAccessToken)
  .delete((req, res) => {
    const idRemoveItem = req.params.idRemoveItem;
    Item.findById(idRemoveItem).then((doc) => {
      doc.deleteOne();
      res.status(200);
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
    if (
      userName === "driver1@test.com" ||
      userName === "driver2@test.com" ||
      userName === "driver3@test.com"
    ) {
      const message = getShoppingListDrivers(userName).then((data) => {
        res.status(200).json(data);
      });
    } else {
      const message = getShoppingListHistory(userName).then((data) => {
        res.status(200).json(data);
      });
    }
  });

messagesRouter.get("/protected/:userName", validateAccessToken, (req, res) => {
  const userName = req.params.userName;
  const message = getUserItems(userName).then((data) => {
    res.status(200).json(data);
  });
});

module.exports = { messagesRouter };
