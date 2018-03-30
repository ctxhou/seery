const {pocket, callbackQuery} = require('../../src/actions/pocket');

test('exports need to be defined', () => {
  expect(pocket).toBeDefined();
  expect(callbackQuery).toBeDefined();
});
