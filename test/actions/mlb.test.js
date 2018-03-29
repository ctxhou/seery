const MLBApi = require('node-mlb-api');
const {normalize} = require('../../src/actions/mlb');

test('normalize', () => {
  expect.assertions(1);
  return MLBApi.getGames('03/13/2018')
  .then(normalize)
  .then((res) => {
    expect(Object.keys(res[0])).toEqual([
      'gameId',
      'gameDate',
      'home',
      'visitor',
      'winner',
      'isPlayed'
    ]);
  });
});
