const config = require('../../env/getConfig');

const maxChar = 4096;

const getTelegramId = (context) => {
  return context.session.user.id;
};

const createURL = (path) => {
  const {protocol, host} = config;
  return `${protocol}://${host}${path}`;
};

module.exports = {
  getTelegramId,
  createURL,
  maxChar
};
