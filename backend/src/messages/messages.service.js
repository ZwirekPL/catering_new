const Item = require("../models/item");
const Storage = require("../models/storage");
const ShoppingList = require("../models/shopping-list");
const ShoppingItem = require("../models/shopping-list-item");

const getUserItems = (userName) => {
  const dataFind = Item.find({
    userName: `${userName}`,
  }).exec();
  return dataFind;
};

const getInventoryHistory = (userName) => {
  const dataFind = Storage.find({
    userName: `${userName}`,
  }).exec();
  return dataFind;
};

const getShoppingListHistory = (userName) => {
  const dataFind = ShoppingList.find({
    userName: `${userName}`,
  }).exec();
  return dataFind;
};

const getShoppingListDrivers = (userName) => {
  const dataFind = ShoppingItem.find().exec();
  return dataFind;
};
module.exports = {
  getInventoryHistory,
  getShoppingListHistory,
  getUserItems,
  getShoppingListDrivers,
};
