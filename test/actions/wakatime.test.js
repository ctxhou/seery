const mockingoose = require('mockingoose').default;
jest.setMock('wakatime', require('../../__mocks__/wakatime'));
const {
  commandAction,
  wakatimeAuth,
  wakatimeToday,
  wakatimeLastweek,
  getWakaTimeInstance,
  regularTime,
  genText
} = require('../../src/actions/wakatime');
const wakatimeData = require('../fakedata/wakatime');

test('exports need to be defined', () => {
  expect(commandAction).toBeDefined();
  expect(wakatimeAuth).toBeDefined();
  expect(wakatimeToday).toBeDefined();
  expect(wakatimeLastweek).toBeDefined();
});

describe('internal function', () => {
  const _doc = {
    _id: '507f191e810c19729de860ea',
    telegramId: '5dd7f191e810c19729de860ea',
    pocketToken: '',
    wakatimeToken: ''
  };

  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('getWakaTimeInstance', () => {
    test('if wakatimeToken does not exist, return false', async () => {
      mockingoose.User.toReturn({..._doc, wakatimeToken: ''}, 'findOne');
      const result = await getWakaTimeInstance(_doc.id);
      expect(result).toEqual(false);
    });

    test('if wakatimeToken existed, return wakatime instance', async () => {
      mockingoose.User.toReturn({..._doc, wakatimeToken: 'sjdifosdjfosdf'}, 'findOne');
      const result = await getWakaTimeInstance(_doc.id);
      expect(typeof result).toEqual('object');
    });
  });

  describe('commandAction', () => {
    const message = {from: {id: _doc.telegramId}};
    test('if token existed, show select range message', async () => {
      mockingoose.User.toReturn({..._doc, wakatimeToken: 'sjdifosdjfosdf'}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      await commandAction({message, replyWithHTML: mockReplyWithHTML});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toEqual('select range');
      expect(call[1]).toHaveProperty('reply_markup');
    });

    test('if token doesnt exist, show get token message', async () => {
      mockingoose.User.toReturn({..._doc, wakatimeToken: ''}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      await commandAction({message, replyWithHTML: mockReplyWithHTML});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toContain('Hi, I found you didn\'t input');
    });
  });

  describe('wakatimeAuth', () => {
    const message = {from: {id: _doc.telegramId}, text: ''};
    describe('if token is correct', () => {
      message.text = '/wakatimeAuth jsidof123jio';
      test('save success', async () => {
        mockingoose.User.toReturn({..._doc, wakatimeToken: ''}, 'findOne');
        const mockReplyWithHTML = jest.fn();
        await wakatimeAuth({message, replyWithHTML: mockReplyWithHTML});
        const call = mockReplyWithHTML.mock.calls[0];
        expect(call[0]).toEqual('Great job! Now you can start to use wakatime service: /wakatime');
      });
    });
    describe('if token is incorrect', () => {
      test('test case 1', async () => {
        message.text = '/wakatimeAuthsidfodfoisdf';
        mockingoose.User.toReturn({..._doc, wakatimeToken: ''}, 'findOne');
        const mockReplyWithHTML = jest.fn();
        await wakatimeAuth({message, replyWithHTML: mockReplyWithHTML});
        const call = mockReplyWithHTML.mock.calls[0];
        expect(call[0]).toEqual('You need to input the token after /wakatime_auth');
      });
      test('test case 2', async () => {
        message.text = '/wakatimeAuth';
        mockingoose.User.toReturn({..._doc, wakatimeToken: ''}, 'findOne');
        const mockReplyWithHTML = jest.fn();
        await wakatimeAuth({message, replyWithHTML: mockReplyWithHTML});
        const call = mockReplyWithHTML.mock.calls[0];
        expect(call[0]).toEqual('You need to input the token after /wakatime_auth');
      });
    });
  });

  describe('wakatimeToday', () => {
    const callbackQuery = {from: {id: _doc.telegramId}};
    test('if get wakatime instance success, and get data success, return result', async () => {
      mockingoose.User.toReturn({..._doc, wakatimeToken: 'sdjfio'}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      const mockAnswerCbQuery = jest.fn();
      await wakatimeToday({callbackQuery, replyWithHTML: mockReplyWithHTML, answerCbQuery: mockAnswerCbQuery});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toContain('Wakatime report from');
    });

    test('if wakatime token is not existed, show auth message', async () => {
      mockingoose.User.toReturn({..._doc, wakatimeToken: ''}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      const mockAnswerCbQuery = jest.fn();
      await wakatimeToday({callbackQuery, replyWithHTML: mockReplyWithHTML, answerCbQuery: mockAnswerCbQuery});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toContain('Hi, I found you didn\'t input');
    });

    test('if token is wrong, cannot get resource, show re-auth message', async () => {
      mockingoose.User.toReturn({..._doc, wakatimeToken: 'wrong-token'}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      const mockAnswerCbQuery = jest.fn();
      await wakatimeToday({callbackQuery, replyWithHTML: mockReplyWithHTML, answerCbQuery: mockAnswerCbQuery});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toContain('Wakatime error');
    });
  });

  describe('wakatimeLastweek', () => {
    const callbackQuery = {from: {id: _doc.telegramId}};
    test('if get wakatime instance success, and get data success, return result', async () => {
      mockingoose.User.toReturn({..._doc, wakatimeToken: 'sdjfio'}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      const mockAnswerCbQuery = jest.fn();
      await wakatimeLastweek({callbackQuery, replyWithHTML: mockReplyWithHTML, answerCbQuery: mockAnswerCbQuery});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toContain('Wakatime report from');
    });

    test('if wakatime token is not existed, show auth message', async () => {
      mockingoose.User.toReturn({..._doc, wakatimeToken: ''}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      const mockAnswerCbQuery = jest.fn();
      await wakatimeLastweek({callbackQuery, replyWithHTML: mockReplyWithHTML, answerCbQuery: mockAnswerCbQuery});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toContain('Hi, I found you didn\'t input');
    });

    test('if token is wrong, cannot get resource, show re-auth message', async () => {
      mockingoose.User.toReturn({..._doc, wakatimeToken: 'wrong-token'}, 'findOne');
      const mockReplyWithHTML = jest.fn();
      const mockAnswerCbQuery = jest.fn();
      await wakatimeLastweek({callbackQuery, replyWithHTML: mockReplyWithHTML, answerCbQuery: mockAnswerCbQuery});
      const call = mockReplyWithHTML.mock.calls[0];
      expect(call[0]).toContain('Wakatime error');
    });
  });


  test('regularTime', () => {
    const re = regularTime(wakatimeData);
    expect(re).toEqual(
      {'end': '2018-01-21T05:59:59Z', 'projects': [['pro1', 296], ['pro2', 148], ['pro3', 148]], 'start': '2018-01-14T06:00:00Z', 'totalSeconds': 592}
    );
  });

  test('genText', () => {
    const re = genText(wakatimeData);
    expect(re).toContain('Wakatime report from');
  });
});
