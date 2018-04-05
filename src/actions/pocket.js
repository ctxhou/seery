const GetPocket = require('node-getpocket');
const subWeeks = require('date-fns/sub_weeks');
const getTime = require('date-fns/get_time');
const Markup = require('telegraf/markup');
const outdent = require('outdent');
const {createURL, maxChar} = require('../utils');
const {getUser} = require('../model/user');
const config = require('../../env/config');

const getPocketInstance = async (telegramId) => {
  const user = await getUser(telegramId);
  const token = user.pocketToken;
  if (token.length === 0) {
    return false;
  }
  const param = {
    consumer_key: config.pocketConsumerToken,
    redirect_uri: createURL('/getpocket_callback')
  };
  return new GetPocket({...param, access_token: token});
};

const getLastWeek = async (telegramId) => {
  const pocket = await getPocketInstance(telegramId);
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

const archiveArticle = async (telegramId, itemId) => {
  const pocket = await getPocketInstance(telegramId);
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

const reAuthAction = async ({replyWithHTML, telegramId}) => {
  const authURL = createURL(`/services/getpocket?telegramId=${telegramId}`);
  replyWithHTML(outdent`
      Seery bot had some problems to get articles from your pocket account.

      Please open this link to re-authorize the bot:
      <a href="${authURL}">${authURL}</a>
    `,
    Markup.inlineKeyboard(
      [
        [Markup.urlButton('Open Url to auth your pocket', authURL)]
      ]
    ).extra()
  );
};

const commandAction = async ({message, replyWithHTML}) => {
  const telegramId = message.from.id;
  const hasToken = await getPocketInstance(telegramId);
  if (hasToken) {
    replyWithHTML('Select pocket services',
      Markup.inlineKeyboard(
        [
          [Markup.callbackButton('Show an article since last week', 'pocket-shuffle-last-week')],
          [Markup.callbackButton('Show all articles since last week', 'pocket-lastweek')]
        ]
      ).extra()
    );
  } else {
    const authURL = createURL(`/services/getpocket?telegramId=${telegramId}`);
    replyWithHTML(outdent`
      Hi, You didn't auth your Pocket to Seery bot.

      Open this link to authorize the bot:

      <a href="${authURL}">${authURL}</a>
    `,
      Markup.inlineKeyboard(
        [
          [Markup.urlButton('Open Url to auth your pocket', authURL)]
        ]
      ).extra()
    );
  }
};

const shuffleLastWeek = async ({callbackQuery, replyWithHTML, answerCbQuery}) => {
  const telegramId = callbackQuery.from.id;
  try {
    const resp = await getLastWeek(telegramId);
    const listKey = Object.keys(resp.list);
    const randomKey = listKey[Math.floor(Math.random() * listKey.length)];
    replyWithHTML(template({[randomKey]: resp.list[randomKey]}),
      Markup.inlineKeyboard(
        [
          Markup.callbackButton('Archive', `pocket-archive-[${randomKey}]`)
        ]
      ).extra()
    );
    answerCbQuery('Success');
  } catch (err) {
    reAuthAction({replyWithHTML, telegramId});
  }
};

const allLastWeek = async ({callbackQuery, replyWithHTML, answerCbQuery}) => {
  const telegramId = callbackQuery.from.id;
  const sendMsg = (messages) => {
    messages = messages.join('\n\n');
    replyWithHTML(messages, {
      disable_web_page_preview: true
    });
  };
  try {
    const resp = await getLastWeek(telegramId);
    const allList = resp.list;
    let messages = ['<b>Pocket All Articles since last week</b>'];
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
  } catch (err) {
    reAuthAction({replyWithHTML, telegramId});
  }
};

const archive = async ({callbackQuery, replyWithHTML, answerCbQuery}) => {
  const articleId = callbackQuery.data.match(/\[(.*?)\]/)[1];
  const telegramId = callbackQuery.from.id;
  try {
    const resp = await archiveArticle(telegramId, articleId);
    if (resp.status === 1) {
      answerCbQuery('Success archive');
    }
  } catch (err) {
    reAuthAction({replyWithHTML, telegramId});
  }
};

module.exports = {
  commandAction,
  shuffleLastWeek,
  allLastWeek,
  archive
};

// for test
module.exports.getPocketInstance = getPocketInstance;
module.exports.getLastWeek = getLastWeek;
