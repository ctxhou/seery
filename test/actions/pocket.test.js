const mockingoose = require('mockingoose').default;
const fakedata = require('../fakedata/pocket');
jest.setMock('node-getpocket', require('../../__mocks__/node-pocket'));
const {
  commandAction,
  shuffleLastWeek,
  allLastWeek,
  archive,
  getLastWeek,
  getPocketInstance
} = require('../../src/actions/pocket');

describe('Pocket', () => {
  const _doc = {
    _id: '507f191e810c19729de860ea',
    telegramId: '5dd7f191e810c19729de860ea',
    pocketToken: '',
    wakatimeToken: ''
  };
  beforeEach(() => {
    mockingoose.resetAll();
  });

  test('exports need to be defined', () => {
    expect(commandAction).toBeDefined();
  });

  describe('getPocketInstance', () => {
    test('if pocketToken is not existed, getPocketInstance return false', () => {
      mockingoose.User.toReturn({..._doc, pocketToken: ''}, 'findOne');
      return getPocketInstance('5dd7f191e810c19729de860ea').then((res) => {
        expect(res).toEqual(false);
      });
    });

    test('if pocketToken is not existed, getPocketInstance return GetPocket instance', () => {
      mockingoose.User.toReturn({..._doc, pocketToken: 'sdfjisfjisd'}, 'findOne');
      return getPocketInstance('5dd7f191e810c19729de860ea').then((res) => {
        expect(res).toBeInstanceOf(require('node-getpocket'));
      });
    });
  });

  describe('getLastWeek', () => {
    test('if auth success, getLastWeek should return correct data', () => {
      mockingoose.User.toReturn({..._doc, pocketToken: 'auth-token'}, 'findOne');
      return getLastWeek('5dd7f191e810c19729de860ea').then((res) => {
        expect(res).toEqual(fakedata);
      });
    });

    test('if auth fail, getLastWeek should return Error', () => {
      mockingoose.User.toReturn({..._doc, pocketToken: 'not-auth-token'}, 'findOne');
      return expect(getLastWeek('5dd7f191e810c19729de860ea')).rejects.toThrow();
    });
  });

  describe('commandAction', () => {
    const message = {from: {id: 'fake-id'}};
    test('if token exist, return select view', async () => {
      mockingoose.User.toReturn({..._doc, pocketToken: 'auth-token'}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      await commandAction({message, replyWithHTML: mockReplyWithHTML});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toEqual('Select pocket services');
      expect(call[1]).toHaveProperty('reply_markup');
    });
    test('if token not exist, return auth view', async () => {
      mockingoose.User.toReturn({..._doc, pocketToken: ''}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      await commandAction({message, replyWithHTML: mockReplyWithHTML});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toContain('Hi, You didn\'t auth');
      expect(call[1]).toHaveProperty('reply_markup');
    });
  });

  describe('shuffleLastWeek', () => {
    const callbackQuery = {from: {id: 'fake-id'}};
    const answerCbQuery = () => {};
    test('if token exist and auth success, return select view', async () => {
      mockingoose.User.toReturn({..._doc, pocketToken: 'auth-token'}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      await shuffleLastWeek({callbackQuery, replyWithHTML: mockReplyWithHTML, answerCbQuery});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toContain('<b>Pocket Articles:</b>');
      expect(call[1]).toHaveProperty('reply_markup');
    });

    test('if auth fail, show re-auth view', async () => {
      mockingoose.User.toReturn({..._doc, pocketToken: 'not-auth-token'}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      await shuffleLastWeek({callbackQuery, replyWithHTML: mockReplyWithHTML, answerCbQuery});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toContain('Please open this link to re-authorize the bot:');
      expect(call[1]).toHaveProperty('reply_markup');
    });
  });

  describe('allLastWeek', () => {
    const callbackQuery = {from: {id: 'fake-id'}};
    const answerCbQuery = () => {};
    test('if token exist and auth success, return select view', async () => {
      mockingoose.User.toReturn({..._doc, pocketToken: 'auth-token'}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      await allLastWeek({callbackQuery, replyWithHTML: mockReplyWithHTML, answerCbQuery});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toContain('<b>Pocket All Articles since last week</b>');
      expect(call[1]).toHaveProperty('disable_web_page_preview', true);
    });

    test('if auth fail, show re-auth view', async () => {
      mockingoose.User.toReturn({..._doc, pocketToken: 'not-auth-token'}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      await allLastWeek({callbackQuery, replyWithHTML: mockReplyWithHTML, answerCbQuery});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toContain('Please open this link to re-authorize the bot:');
      expect(call[1]).toHaveProperty('reply_markup');
    });
  });

  describe('archive', () => {
    const callbackQuery = {data: 'pocket-archive-[1231231]', from: {id: 'fake-id'}};
    const answerCbQuery = () => {};
    test('if token exist and auth success, return select view', async () => {
      mockingoose.User.toReturn({..._doc, pocketToken: 'auth-token'}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      await archive({callbackQuery, replyWithHTML: mockReplyWithHTML, answerCbQuery});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toContain('<b>Pocket All Articles since last week</b>');
      expect(call[1]).toHaveProperty('disable_web_page_preview', true);
    });

    test('if auth fail, show re-auth view', async () => {
      mockingoose.User.toReturn({..._doc, pocketToken: 'not-auth-token'}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      await archive({callbackQuery, replyWithHTML: mockReplyWithHTML, answerCbQuery});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toContain('Please open this link to re-authorize the bot:');
      expect(call[1]).toHaveProperty('reply_markup');
    });
  });
});
