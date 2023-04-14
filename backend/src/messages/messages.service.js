const Item = require("../models/item");
const Storage = require("../models/storage");
const ShoppingList = require("../models/shopping-list");
const ShoppingItem = require("../models/shopping-list-item");

const getUserItems = (userName) => {
  const dataFind = Item.find({
    userName: `${userName}`,
  }).exec();
  // console.log(`messages`, dataFind);
  return dataFind;
};

const getInventoryHistory = (userName) => {
  const dataFind = Storage.find({
    userName: `${userName}`,
  }).exec();
  // console.log(`messages`, dataFind);
  return dataFind;
};

const getShoppingListHistory = (userName) => {
  const dataFind = ShoppingList.find({
    userName: `${userName}`,
  }).exec();
  // console.log(`messages`, dataFind);
  return dataFind;
};

// const getShoppingListItems = (itemId) => {
//   const dataFind = ShoppingItem.findById(itemId).exec();
//   // console.log(`messages`, dataFind);
//   return dataFind;
// };
const getShoppingListItems = (itemName) => {
  const dataFind = ShoppingItem.find({
    item: `${itemName}`,
  }).exec();
  // console.log(`messages`, dataFind);
  return dataFind;
};
// TUTAJ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const getPublicMessage = () => {
  return {
    text: "This is a publiccc message.",
  };
};

const getAdminMessage = () => {
  return {
    text: "This is an admin message.",
  };
};

module.exports = {
  getInventoryHistory,
  getShoppingListHistory,
  getUserItems,
  getShoppingListItems,
  getAdminMessage,
  getPublicMessage,
};
