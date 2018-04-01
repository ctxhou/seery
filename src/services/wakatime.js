const {wakatime, wakatimeAuth, wakatimeToday, wakatimeLastweek} = require('../actions/wakatime');

const messageHandler = (bot) => {
  bot.command('/wakatime', wakatime);
  bot.hears(/\/wakatime_auth/, wakatimeAuth);
  bot.action('wakatime-today', wakatimeToday);
  bot.action('wakatime-lastweek', wakatimeLastweek);
};

module.exports = {
  message: messageHandler
};
