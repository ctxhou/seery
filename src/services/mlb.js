const parse = require('date-fns/parse');
const addDays = require('date-fns/add_days');
const subDays = require('date-fns/sub_days');
const {
  mlbHelper,
  mlb,
  mlbError
} = require('../actions/mlb');

const messageHandler = (bot) => {
  bot.hears(/\/mlb/i, async (ctx) => {
    const textMessage = ctx.message.text;
    switch (true) {
      case textMessage === '/mlb': {
        return mlbHelper(ctx);
        break;
      }

      case textMessage === '/mlb t': {
        await mlb(ctx, new Date());
        break;
      }

      case textMessage === '/mlb y': {
        await mlb(ctx, subDays(new Date(), 1));
        break;
      }

      case textMessage === '/mlb tmr': {
        await mlb(ctx, addDays(new Date(), 1));
        break;
      }

      case textMessage.substring(0, 4) === '/mlb': {
        const date = textMessage.replace('/mlb', '').trim();
        const parseDate = parse(date);
        // check date is valid
        if (!isNaN(parseDate.getTime())) {
          await mlb(ctx, parseDate);
        } else {
          return mlbError(ctx, date);
        }
        break;
      }
    }
  });
};

module.exports = {
  message: messageHandler
};
