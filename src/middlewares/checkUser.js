const {newUser} = require('../model/user');

module.exports = ({from}, next) => {
  const telegramId = from.id;
  newUser(telegramId);
  return next();
};
