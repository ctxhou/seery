const Telegraf = require('telegraf');
const express = require('express');
const telegrafSession = require('telegraf/session');
const Grant = require('grant-express');
const session = require('express-session');
const config = require('./env/config');
require('./src/model/db');

const services = require('./src/services');
const middlewares = require('./src/middlewares');
const serviceRouters = require('./src/routes');
const grant = new Grant(
  {
    'server': {
      'protocol': config.protocol,
      'host': config.host
    },
    'getpocket': {
      'key': config.pocketConsumerToken,
      'callback': '/getpocket_callback'
    }
  }
);

const bot = new Telegraf(config.telegramToken);
bot.use(telegrafSession());
middlewares(bot);
services(bot);
bot.telegram.setWebhook(config.publicUrl);

const app = express();
// app.get('/', (req, res) => res.send('Hello World!'));
app.use(bot.webhookCallback('/'));
app.use(session({secret: 'very secret'}));
app.use(grant);
app.use(...serviceRouters);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('server is running on ' + port + ' port...');
});
