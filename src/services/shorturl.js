const {shorturl, shorturlHelper} = require('../actions/shorturl');

const messageHandler = (bot) => {
  bot.hears(/\/shorturl/i, async (ctx) => {
    const textMessage = ctx.message.text;
    switch (true) {
      case textMessage === '/shorturl': {
        shorturlHelper(ctx);
        break;
      }

      case textMessage.substring(0, 9) === '/shorturl': {
        await shorturl(ctx, textMessage);
        break;
      }
    }
  });
};

module.exports = {
  message: messageHandler
};
