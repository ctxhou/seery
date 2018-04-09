const config = require('../../env/config');
const botimize = require('botimize')(config.botimizeToken, 'telegram');

module.exports = (ctx, next) => {
  // botimize incoming
  return next(ctx).then(() => {
    if (process.env.NODE_ENV === 'production') {
      let incomingLog = ctx.update;
      botimize.logIncoming(incomingLog);
    }
  });
};
