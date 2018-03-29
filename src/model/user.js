const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  telegramId: String,
  pocketToken: {type: String, default: ''},
  wakatimeToken: {type: String, default: ''}
});

const User = mongoose.model('User', userSchema);

const getUser = async (telegramId) => {
  const query = User.findOne({telegramId});
  const user = await query.exec();
  return user;
};

const newUser = async (telegramId) => {
  User.findOne({telegramId}, (err, user) => {
    if (!user) {
      const user = new User({telegramId});
      user.save((err) => {
        if (err) throw err;
        console.log('User saved successfully!');
      });
    }
  });
};

const saveWakatimeToken = async (telegramId, token) => {
  const user = await getUser(telegramId);
  user.wakatimeToken = token;
  return user.save();
};

module.exports = {
  getUser,
  newUser,
  saveWakatimeToken
};
