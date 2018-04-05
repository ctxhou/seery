jest.setMock('nba-stats-client', require('../../__mocks__/nba-stats-client'));
const {
  // nbaHelper,
  // nba,
  // nbaError,
  normalize
} = require('../../src/actions/nba');
const nbaClient = require('nba-stats-client');

describe('nba', () => {

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
