const Item = require("../models/item");

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
  getUserItems,
  getAdminMessage,
  getPublicMessage,
};
