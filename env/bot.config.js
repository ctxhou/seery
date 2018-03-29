const env = process.env.NODE_ENV || 'development';
const config = require(`./bot.config.${env}`);

module.exports = config;
