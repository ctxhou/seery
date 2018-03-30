const {
  wakatime,
  wakatimeAuth,
  callbackQuery
} = require('../../src/actions/wakatime');

test('exports need to be defined', () => {
  expect(wakatime).toBeDefined();
  expect(wakatimeAuth).toBeDefined();
  expect(callbackQuery).toBeDefined();
});
