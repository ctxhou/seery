const {commandAction, wakatimeAuth, wakatimeToday, wakatimeLastweek} = require('../actions/wakatime');

const messageHandler = (bot) => {
  bot.command('/wakatime', commandAction);
  bot.hears(/\/wakatime_auth/, wakatimeAuth);
  bot.action('wakatime-today', wakatimeToday);
  bot.action('wakatime-lastweek', wakatimeLastweek);
};

module.exports = {
  message: messageHandler
};
