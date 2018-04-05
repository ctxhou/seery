const {newUser} = require('../model/user');

module.exports = (ctx, next) => {
  const telegramId = ctx.from.id;
  return newUser(telegramId).then(() => {
    console.log('finish');
    return next(ctx);
  });
};
