const express = require("express");
const Item = require("../models/item");
const {
  getAdminMessage,
  getProtectedMessage,
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
//tu
messagesRouter
  .route("/delete/:idRemoveItem", validateAccessToken)
  .delete((req, res) => {
    const idRemoveItem = req.params.idRemoveItem;
    // console.log(idRemoveItem);
    Item.findById(`${idRemoveItem}`).then((doc) => {
      doc.deleteOne();
    });
  });
messagesRouter.get("/public", (req, res) => {
  const message = getPublicMessage();

  res.status(200).json(message);
});

// messagesRouter.get("/protected", validateAccessToken, (req, res) => {
//   const message = getProtectedMessage();

//   res.status(200).json(message);
// });

messagesRouter.get("/protected", validateAccessToken, (req, res) => {
  const message = getProtectedMessage().then((data) => {
    // console.log(`router`, data);
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
