const {regularTime, genText} = require('../src/services/wakatime');
const {wakatimeData} = require('./testdata');

test('regularTime', () => {
  const re = regularTime(wakatimeData);
  expect(re).toEqual(
    {'end': '2018-01-21T05:59:59Z', 'projects': [['pro1', 296], ['pro2', 148], ['pro3', 148]], 'start': '2018-01-14T06:00:00Z', 'totalSeconds': 592}
  );
});

test('genText', () => {
  const re = genText(wakatimeData);
  expect(re).toEqual(
`
----------------------------------------------------------------------
Wakatime report from 2018-01-14 00:00 to 2018-01-20 23:59:

*Total Time: 9 mins 52 secs*

*Project Time*:
．pro1: 4 mins 56 secs
．pro2: 2 mins 28 secs
．pro3: 2 mins 28 secs
----------------------------------------------------------------------
`
  );
});
