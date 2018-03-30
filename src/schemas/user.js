const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  telegramId: {type: String, required: true},
  pocketToken: {type: String, default: ''},
  wakatimeToken: {type: String, default: ''}
});

module.exports = mongoose.model('User', userSchema);
