const {pocket, callbackQuery} = require('../actions/pocket');

const messageHandler = (bot) => {
  bot.command('/pocket', pocket);
};

module.exports = {
  message: messageHandler,
  callback: callbackQuery
};
