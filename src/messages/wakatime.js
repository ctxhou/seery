exports.sendGetTokenMessage = async (replyWithHTML) => {
  replyWithHTML(`
    Hi, I found you didn't input your Wakatime token to Seery bot.

    Please open your wakatime <a href="https://wakatime.com/settings/account">profile page</a>, and copy the secret api key.

    After you copy the token, call me via /wakatime_auth [token] command, this token is only used in Seery bot service.
    Example: /wakatime_auth 12u93u8sfop

    Where can I copy the token? <a href="https://i.imgur.com/Cwz7UE3.png">Image</a>
  `);
};

exports.sendSelectRangeMessage = (replyWithHTML) => {
  replyWithHTML('select range', {
    reply_markup: {
      'inline_keyboard': [
        [{
          text: 'Today',
          callback_data: 'wakatime-today'
        }],
        [{
          text: 'Last week',
          callback_data: 'wakatime-lastweek'
        }]
      ]
    }
  });
};
