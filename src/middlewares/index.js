const checkUser = require('./checkUser');
const responseTime = require('./responseTime');
const botimize = require('./botimize');

const middleWares = (bot) => {
  bot.use(checkUser);
  bot.use(responseTime);
  bot.use(botimize);
};

module.exports = middleWares;
