const {wakatime, wakatimeAuth, callbackQuery} = require('../actions/wakatime');

const messageHandler = (bot) => {
  bot.command('/wakatime', wakatime);
  bot.hears(/\/wakatime_auth/, wakatimeAuth);
};

module.exports = {
  message: messageHandler,
  callback: callbackQuery
};
