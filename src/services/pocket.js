const {
  commandAction,
  shuffleLastWeek,
  allLastWeek,
  archive
} = require('../actions/pocket');

const messageHandler = (bot) => {
  bot.command('/pocket', commandAction);
  bot.action('pocket-shuffle-last-week', shuffleLastWeek);
  bot.action('pocket-lastweek', allLastWeek);
  bot.action(/pocket-archive-/, archive);
};

module.exports = {
  message: messageHandler
};
