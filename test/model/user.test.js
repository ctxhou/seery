const mockingoose = require('mockingoose').default;
const User = require('../../src/schemas/user'); // eslint-disable-line
const {
  getUser,
  newUser,
  saveToken
} = require('../../src/model/user');

describe('test mongoose User model', () => {
  const _doc = {
    _id: '507f191e810c19729de860ea',
    telegramId: '5dd7f191e810c19729de860ea',
    pocketToken: '',
    wakatimeToken: ''
  };

  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('getUser', () => {
    mockingoose.User.toReturn(_doc, 'findOne'); // findById is findOne
    return getUser(_doc.telegramId).then((res) => {
      expect(JSON.parse(JSON.stringify(res))).toMatchObject(_doc);
    });
  });

  it('newUser', () => {
    const telegramId = 'sdfsdfs';
    return newUser(telegramId).then((res) => {
      expect(res.telegramId).toEqual(telegramId);
    });
  });

  it('saveToken', () => {
    const token = 'dsfsdfsdf';
    mockingoose.User.toReturn(_doc, 'findOne'); // findById is findOne
    return saveToken(_doc.id, 'wakatimeToken', token).then((user) => {
      expect(user.wakatimeToken).toEqual(token);
    });
  });
});
