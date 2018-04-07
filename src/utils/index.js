const urljoin = require('url-join');
const config = require('../../env/config');

const maxChar = 4096;

const getTelegramId = (context) => {
  return context.session.user.id;
};

const createURL = (path) => {
  const {publicUrl} = config;
  return urljoin(publicUrl, path);
};

module.exports = {
  getTelegramId,
  createURL,
  maxChar
};
