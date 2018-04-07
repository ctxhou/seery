jest.setMock('node-mlb-api', require('../../__mocks__/node-mlb-api'));
const {
  mlbHelper,
  mlb,
  mlbError,
  getMlbRecord
} = require('../../src/actions/mlb');

test('mlbHelper', () => {
  const mockReplyWithHTML = jest.fn();
  mlbHelper({replyWithHTML: mockReplyWithHTML});
  const call = mockReplyWithHTML.mock.calls[0];
  expect(call[0]).toContain('MLB service is here');
});

test('mlbError', () => {
  const mockReplyWithHTML = jest.fn();
  mlbError({replyWithHTML: mockReplyWithHTML});
  const call = mockReplyWithHTML.mock.calls[0];
  expect(call[0]).toContain('MLB service error');
});

describe('mlb', () => {
  test('if the date had game', async () => {
    const mockReplyWithHTML = jest.fn();
    await mlb({replyWithHTML: mockReplyWithHTML}, new Date(2017, 8, 11));
    const call = mockReplyWithHTML.mock.calls[0];
    expect(call[0]).toContain('<b>Toronto Blue Jays</b> vs Baltimore Orioles');
    expect(call[1]).toHaveProperty('disable_web_page_preview');
  });

  test('if the date didnt have game', async () => {
    const mockReplyWithHTML = jest.fn();
    await mlb({replyWithHTML: mockReplyWithHTML}, new Date(2018, 9, 13));
    const call = mockReplyWithHTML.mock.calls[0];
    expect(call[0]).toContain('There is no MLB match at');
  });
});

test('getMlbRecord', () => {
  expect.assertions(1);
  return getMlbRecord(new Date(2017, 8, 11))
    .then((re) => {
      expect(re).toEqual([
        {
          'gameDate': '2017-09-11T23:07:00Z',
          'gameId': 492246,
          'home': {
            'name': 'Toronto Blue Jays',
            'score': 4
          },
          'isPlayed': true,
          'visitor': {
            'name': 'Baltimore Orioles',
            'score': 3
          },
          'winner': 'home'
        },
        {
          'gameDate': '2017-09-11T23:10:00Z',
          'gameId': 492249,
          'home': {
            'name': 'Cleveland Indians',
            'score': 11
          },
          'isPlayed': true,
          'visitor': {
            'name': 'Detroit Tigers',
            'score': 0
          },
          'winner': 'home'
        },
        {
          'gameDate': '2017-09-11T23:10:00Z',
          'gameId': 492251,
          'home': {
            'name': 'Tampa Bay Rays',
            'score': 1
          },
          'isPlayed': true,
          'visitor': {
            'name': 'New York Yankees',
            'score': 5
          },
          'winner': 'visitor'
        },
        {
          'gameDate': '2017-09-11T23:40:00Z',
          'gameId': 492252,
          'home': {
            'name': 'Milwaukee Brewers',
            'score': 0
          },
          'isPlayed': true,
          'visitor': {
            'name': 'Pittsburgh Pirates',
            'score': 7
          },
          'winner': 'visitor'
        },
        {
          'gameDate': '2017-09-12T00:05:00Z',
          'gameId': 492253,
          'home': {
            'name': 'Texas Rangers',
            'score': 5
          },
          'isPlayed': true,
          'visitor': {
            'name': 'Seattle Mariners',
            'score': 3
          },
          'winner': 'home'
        },
        {
          'gameDate': '2017-09-12T00:15:00Z',
          'gameId': 492247,
          'home': {
            'name': 'Kansas City Royals',
            'score': 3
          },
          'isPlayed': true,
          'visitor': {
            'name': 'Chicago White Sox',
            'score': 11
          },
          'winner': 'visitor'
        },
        {
          'gameDate': '2017-09-12T01:40:00Z',
          'gameId': 492248,
          'home': {
            'name': 'Arizona Diamondbacks',
            'score': 4
          },
          'isPlayed': true,
          'visitor': {
            'name': 'Colorado Rockies',
            'score': 5
          },
          'winner': 'visitor'
        },
        {
          'gameDate': '2017-09-12T02:15:00Z',
          'gameId': 492250,
          'home': {
            'name': 'San Francisco Giants',
            'score': 8
          },
          'isPlayed': true,
          'visitor': {
            'name': 'Los Angeles Dodgers',
            'score': 6
          },
          'winner': 'home'
        }
      ]);
    });
});
