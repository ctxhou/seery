const {secondsToHourMin} = require('../../src/utils/time');

test('secondsToHourMin', () => {
  expect(secondsToHourMin(60)).toEqual('1 min');
  expect(secondsToHourMin(120)).toEqual('2 mins');
  expect(secondsToHourMin(3600)).toEqual('1 hr');
  expect(secondsToHourMin(5000)).toEqual('1 hr 23 mins 20 secs');
});
