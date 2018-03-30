const hnApi = require('node-hn-api');
const {hn, normalize} = require('../../src/actions/hn');

test('hn need to be defined', () => {
  expect(hn).toBeDefined();
});

test('normalize', () => {
  expect.assertions(2);
  return hnApi.fetchTopStories(5)
    .then(normalize)
    .then((result) => {
      expect(result.length).toEqual(5);
      const keys = Object.keys(result[0]);
      expect(keys).toEqual(['title', 'url', 'score']);
    });
});
