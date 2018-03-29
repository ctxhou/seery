const {hn} = require('../actions/hn');

const messageHandler = (bot) => {
  bot.hears(/\/hn/i, async (ctx) => {
    await hn(ctx);
  });
};

module.exports = {
  message: messageHandler
};
