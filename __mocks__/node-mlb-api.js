'use strict';
const fakeData = require('../test/fakedata/mlb');
jest.genMockFromModule('node-mlb-api');

const getGames = function(date) {
  return Promise.resolve(fakeData[date]);
};

module.exports = {getGames};
