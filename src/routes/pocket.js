const qs = require('qs');
const express = require('express');
const router = new express.Router();
const {saveToken} = require('../model/user');

router.get('/services/getpocket', (req, res) => {
  const telegramId = req.query.telegramId;
  res.redirect('/connect/getpocket?' + qs.stringify({state: `telegramId=${telegramId}`}));
});

router.get('/getpocket_callback', function(req, res) {
  const telegramId = qs.parse(req.query.raw.state).telegramId;
  saveToken(telegramId, 'pocketToken', req.query.access_token);
  res.end(JSON.stringify(req.query, null, 2));
});

module.exports = router;
