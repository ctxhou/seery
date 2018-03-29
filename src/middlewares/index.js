const checkUser = require('./checkUser');
const responseTime = require('./responseTime');


const middleWares = (bot) => {
  bot.use(checkUser);
  bot.use(responseTime);
};

module.exports = middleWares;
