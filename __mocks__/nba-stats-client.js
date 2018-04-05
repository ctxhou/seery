'use strict';
const format = require('date-fns/format');
const fakeData = require('../test/fakedata/nba');
jest.genMockFromModule('nba-stats-client');

const getGamesFromDate = function(date) {
  date = format(date, 'YYYYMMDD');
  return Promise.resolve(fakeData[date]);
};

module.exports = {getGamesFromDate};
