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
      // console.log(products);
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
          },
          {}
        )
      );
      // console.log(result);
      const updateDriverItem = async (props) => {
        const userName = props.userName;
        const item = props.item;
        const capacity = props.capacity;
        const bulkQuantity = props.bulkQuantity;
        const quantityNow = props.quantityNow;
        const unit = props.unit;
        const editBy = props.editBy;
        const category = props.category;
        // chyba dodaje stringi

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
            upsert: true, // Make this update into an upsert
          }
        );

        // const newList = new ShoppingItem({
        //   userName,
        //   item,
        //   capacity,
        //   bulkQuantity,
        //   quantityNow,
        //   unit,
        //   editBy,
        //   category,
        // });
        // newList.save();
      };
      result.map((props) => {
        updateDriverItem(props);
      });

      // console.log(result);
      // const itemsToUpdate = currentList.filter((elem) => {
      //   return products.some((ele) => {
      //     return ele.item === elem.item;
      //   });
      // });
      // const updatedItems =
      // console.log(itemsToUpdate);
    };

    // const newShoppingItem = ShoppingItem.insertMany(products, {
    //   ordered: false,
    // })
    //   .then(function () {
    //     console.log("Successfully saved many items to DB");
    //   })
    //   .catch(function (err, docs) {
    //     const errorIndex = err.writeErrors.map((error) => error.index);
    //     console.log(errorIndex);
    //   });
    updateDriverList(products);
    await newInventory.save();
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
    if (
      userName === "kierowca1@test.pl" ||
      userName === "kierowca2@test.pl" ||
      userName === "kierowca3@test.pl"
    ) {
      const message = getShoppingListDrivers(userName).then((data) => {
        res.status(200).json(data);

        // console.log(data);
      });
    } else {
      const message = getShoppingListHistory(userName).then((data) => {
        // console.log(data);
        // console.log(data[0].products);
        res.status(200).json(data);
      });
    }
  });

messagesRouter.get("/protected/:userName", validateAccessToken, (req, res) => {
  const userName = req.params.userName;
  // console.log(userName);
  const message = getUserItems(userName).then((data) => {
    res.status(200).json(data);
  });
});

module.exports = { messagesRouter };
