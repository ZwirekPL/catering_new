const getPublicMessage = () => {
  return {
    text: "This is a publiccc message.",
  };
};

const getProtectedMessage = () => {
  return {
    text: "This is a protected message.",
  };
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
