const parse = require('date-fns/parse');
const addDays = require('date-fns/add_days');
const subDays = require('date-fns/sub_days');
const {
  nbaHelper,
  nba,
  nbaError
} = require('../actions/nba');

const messageHandler = (bot) => {
  bot.hears(/\/nba/i, async (ctx) => {
    const textMessage = ctx.message.text;
    switch (true) {
      case textMessage === '/nba': {
        return nbaHelper(ctx);
        break;
      }

      case textMessage === '/nba t': {
        await nba(ctx, new Date());
        break;
      }

      case textMessage === '/nba y': {
        await nba(ctx, subDays(new Date(), 1));
        break;
      }

      case textMessage === '/nba tmr': {
        await nba(ctx, addDays(new Date(), 1));
        break;
      }

      case textMessage.substring(0, 4) === '/nba': {
        const date = textMessage.replace('/nba', '').trim();
        const parseDate = parse(date);
        // check date is valid
        if (!isNaN(parseDate.getTime())) {
          await nba(ctx, parseDate);
        } else {
          return nbaError(ctx, date);
        }
        break;
      }
    }
  });
};

module.exports = {
  message: messageHandler
};
