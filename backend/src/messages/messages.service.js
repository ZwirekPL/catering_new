const getPublicMessage = () => {
  return {
    text: "This is a publiccc message.",
  };
};

// const getProtectedMessage = () => {
//   return {
//     text: "This is a protected message.",
//   };
// };
const getProtectedMessage = async () => {
  const data = await ItemModel.find({
    userName: authenticatedUserId,
  }).exec();
  res.status(200).json(data);
  return {};
};

const getAdminMessage = () => {
  return {
    text: "This is an admin message.",
  };
};

module.exports = {
  getPublicMessage,
  getProtectedMessage,
  getAdminMessage,
};
