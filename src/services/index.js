const defaultHandler = require('./default');
const wakatimeHandler = require('./wakatime');
const pocketHandler = require('./pocket');
const shorturlHanlder = require('./shorturl');
const nbaHanlder = require('./nba');
const mlbHanlder = require('./mlb');
const hnHanlder = require('./hn');

const services = (bot) => {
  bot.start(defaultHandler);
  bot.command('/help', defaultHandler);
  nbaHanlder.message(bot);
  mlbHanlder.message(bot);
  shorturlHanlder.message(bot);
  hnHanlder.message(bot);
  pocketHandler.message(bot);
  wakatimeHandler.message(bot);

  bot.on('callback_query', async (ctx) => {
    await pocketHandler.callback(ctx);
    await wakatimeHandler.callback(ctx);
  });
};

module.exports = services;
