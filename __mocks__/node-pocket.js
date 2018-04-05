'use strict';
let GetPocket = require('node-getpocket');
const fakeData = require('../test/fakedata/pocket');
jest.genMockFromModule('node-getpocket');

GetPocket = function(params) {
  this.params = params;
};

GetPocket.prototype.get = function(params, cb) {
  const accessToken = this.params.access_token;
  if (accessToken === 'auth-token') {
    cb(false, fakeData);
  } else {
    cb(true);
  }
};

GetPocket.prototype.archive = function(params, cb) {
  const accessToken = this.params.access_token;
  if (accessToken === 'auth-token') {
    cb(false, {status: 1});
  } else {
    cb(true);
  }
};


module.exports = GetPocket;
