jest.setMock('nba-stats-client', require('../../__mocks__/nba-stats-client'));
const {
  nbaHelper,
  nba,
  nbaError,
  normalize
} = require('../../src/actions/nba');
const nbaClient = require('nba-stats-client');

test('nbaHelper', () => {
  const mockReplyWithHTML = jest.fn();
  nbaHelper({replyWithHTML: mockReplyWithHTML});
  const call = mockReplyWithHTML.mock.calls[0];
  expect(call[0]).toContain('NBA service is here');
});

test('nbaError', () => {
  const mockReplyWithHTML = jest.fn();
  nbaError({replyWithHTML: mockReplyWithHTML});
  const call = mockReplyWithHTML.mock.calls[0];
  expect(call[0]).toContain('NBA service error');
});

describe('nba', () => {
  test('if the date had game', async () => {
    const mockReplyWithHTML = jest.fn();
    await nba({replyWithHTML: mockReplyWithHTML}, new Date(2018, 2, 10));
    const call = mockReplyWithHTML.mock.calls[0];
    expect(call[0]).toContain('<b>CHA</b> vs PHX');
    expect(call[1]).toHaveProperty('disable_web_page_preview');
  });

  test('if the date didnt have game', async () => {
    const mockReplyWithHTML = jest.fn();
    await nba({replyWithHTML: mockReplyWithHTML}, new Date(2017, 8, 5));
    const call = mockReplyWithHTML.mock.calls[0];
    expect(call[0]).toContain('There is no NBA game in');
  });
});

test('normalize', () => {
  expect.assertions(1);
  return nbaClient.getGamesFromDate(new Date(2018, 2, 10))
    .then(normalize)
    .then((re) => {
      expect(re).toEqual([
        {
          gameTime: '1700',
          home: {
            name: 'CHA',
            score: '122'
          },
          isPlayed: true,
          periodTime: {
            game_clock: '',
            game_status: '3',
            period_name: 'Qtr',
            period_status: 'Final',
            period_value: '4',
            total_periods: '4'
          },
          visitor: {
            name: 'PHX',
            score: '115'
          },
          winner: 'home'
        },
        {
          gameTime: '1930',
          home: {
            name: 'MIA',
            score: '129'
          },
          isPlayed: true,
          periodTime: {
            game_clock: '',
            game_status: '3',
            period_name: 'Qtr',
            period_status: 'Final',
            period_value: '4',
            total_periods: '4'
          },
          visitor: {
            name: 'WAS',
            score: '102'
          },
          winner: 'home'
        },
        {
          gameTime: '2030',
          home: {
            name: 'DAL',
            score: '114'
          },
          isPlayed: true,
          periodTime: {
            game_clock: '',
            game_status: '3',
            period_name: 'Qtr',
            period_status: 'Final',
            period_value: '4',
            total_periods: '4'
          },
          visitor: {
            name: 'MEM',
            score: '80'
          },
          winner: 'home'
        },
        {
          gameTime: '2030',
          home: {
            name: 'OKC',
            score: '104'
          },
          isPlayed: true,
          periodTime: {
            game_clock: '',
            game_status: '3',
            period_name: 'Qtr',
            period_status: 'Final',
            period_value: '4',
            total_periods: '4'
          },
          visitor: {
            name: 'SAS',
            score: '94'
          },
          winner: 'home'
        },
        {
          gameTime: '2230',
          home: {
            name: 'LAC',
            score: '113'
          },
          isPlayed: true,
          periodTime: {
            game_clock: '',
            game_status: '3',
            period_name: 'Qtr',
            period_status: 'Final',
            period_value: '4',
            total_periods: '4'
          },
          visitor: {
            name: 'ORL',
            score: '105'
          },
          winner: 'home'
        }
      ]);
    });
});
