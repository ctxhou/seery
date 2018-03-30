const {shorturl, shorturlHelper} = require('../../src/actions/shorturl');

test('exports need to be defined', () => {
  expect(shorturl).toBeDefined();
  expect(shorturlHelper).toBeDefined();
});
