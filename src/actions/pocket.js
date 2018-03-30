const GetPocket = require('node-getpocket');
const subWeeks = require('date-fns/sub_weeks');
const getTime = require('date-fns/get_time');
const outdent = require('outdent');
const {createURL, maxChar} = require('../utils');
const {getUser} = require('../model/user');
const config = require('../../env/config');

const getToken = async (telegramId) => {
  const user = await getUser(telegramId);
  return user.pocketToken;
};

const getPocketInstance = (token) => {
  const param = {
    consumer_key: config.pocketConsumerToken,
    redirect_uri: createURL('/getpocket_callback')
  };
  return new GetPocket({...param, access_token: token});
};

const getLastWeek = (token) => {
  const pocket = getPocketInstance(token);
  return new Promise((res, rej) => {
    pocket.get({since: getTime(subWeeks(new Date(), 1)) / 1000, state: 'unread'}, (err, resp) => {
      if (err) {
        rej(err);
      } else {
        res(resp);
      }
    });
  });
};

const archiveArticle = (token, itemId) => {
  const pocket = getPocketInstance(token);
  return new Promise((res, rej) => {
    pocket.archive({item_id: itemId}, (err, resp) => {
      if (err) {
        rej(err);
      } else {
        res(resp);
      }
    });
  });
};

const articleTemplate = (list, wordCount = true) => {
  return outdent`
    ${list.given_title || list.resolved_title}
    ${list.given_url}
    ${wordCount ? `word count: ${list.word_count}` : ''}
  `;
};

const template = (lists) => {
  return outdent`
    <b>Pocket Articles:</b>
    ${Object.keys(lists).map((listKey) => {
      const list = lists[listKey];
      return articleTemplate(list);
    }).join('---------------------------------------')}
  `;
};

const pocket = async ({message, replyWithHTML}) => {
  const telegramId = message.from.id;
  const token = await getToken(telegramId);
  const hasToken = token.length > 0;
  if (hasToken) {
    replyWithHTML('Select pocket services', {
      reply_markup: {
        inline_keyboard: [
          [{
            text: 'Show an article since last week',
            callback_data: 'pocket-shuffle-last-week'
          }],
          [{
            text: 'Show all articles since last week',
            callback_data: 'pocket-lastweek'
          }]
        ]
      }
    });
  } else {
    const authURL = createURL(`/services/getpocket?telegramId=${telegramId}`);
    replyWithHTML(outdent`
      Hi, I found you didn't auth your Pocket to Seery bot.

      Open this link to authorize the bot:

      <a href="${authURL}">${authURL}</a>
    `);
  }
};

const callbackQuery = async ({callbackQuery, replyWithHTML, answerCbQuery}) => {
  const telegramId = callbackQuery.from.id;
  const data = callbackQuery.data;
  switch (true) {
    case data === 'pocket-shuffle-last-week': {
      const token = await getToken(telegramId);
      const resp = await getLastWeek(token);
      const listKey = Object.keys(resp.list);
      const randomKey = listKey[Math.floor(Math.random() * listKey.length)];
      replyWithHTML(template({[randomKey]: resp.list[randomKey]}), {
        reply_markup: {
          inline_keyboard: [
            [{
              text: 'Archive',
              callback_data: `pocket-archive-[${randomKey}]`
            }]
          ]
        }
      });
      answerCbQuery('Success');
      break;
    }
    case data === 'pocket-lastweek': {
      const token = await getToken(telegramId);
      const sendMsg = (messages) => {
        messages = messages.join('\n\n');
        replyWithHTML(messages, {
          disable_web_page_preview: true
        });
      };
      const resp = await getLastWeek(token);
      const allList = resp.list;
      let messages = [];
      let charCount = 0;
      for (let id in allList) {
        if (allList[id]) {
          const list = allList[id];
          const article = articleTemplate(list, false);
          if (charCount + article.length > maxChar) {
            sendMsg(messages);
            charCount = 0;
            messages = [];
          } else {
            charCount += article.length;
            messages.push(article);
          }
        }
      }
      if (messages.length > 0) {
        sendMsg(messages);
      }
      answerCbQuery('Success');
      break;
    }
    case data.substring(0, 14) === 'pocket-archive': {
      const articleId = data.match(/\[(.*?)\]/)[1];
      const token = await getToken(telegramId);
      const resp = await archiveArticle(token, articleId);
      if (resp.status === 1) {
        answerCbQuery('Success archive');
      }
      break;
    }
  }
};


module.exports = {
  pocket,
  callbackQuery
};
