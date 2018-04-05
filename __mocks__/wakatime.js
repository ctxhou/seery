'use strict';

const fakeData = require('../test/fakedata/wakatime');
jest.genMockFromModule('wakatime');

const WakaTime = function(token) {
  this.token = token;
};

WakaTime.prototype.summaries = function(date) {
  if (this.token === 'wrong-token') {
    return Promise.reject();
  }
  return Promise.resolve(fakeData);
};

module.exports = {WakaTime};
