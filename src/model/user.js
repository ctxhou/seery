const User = require('../schemas/user');

const getUser = async (telegramId) => {
  const query = User.findOne({telegramId});
  const user = await query.exec();
  return user;
};

const newUser = async (telegramId) => {
  const query = User.findOne({telegramId});
  const user = await query.exec();
  if (!user) {
    try {
      const user = new User({telegramId});
      const result = await user.save();
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
  return false;
};

const saveToken = async (telegramId, key, token) => {
  const user = await getUser(telegramId);
  user[key] = token;
  return user.save();
};

module.exports = {
  User,
  getUser,
  newUser,
  saveToken
};
