const outdent = require('outdent');
const Markup = require('telegraf/markup');

const defaultHandler = ({replyWithHTML}) => {
  replyWithHTML(outdent`
    Hi, I am Seery bot. I can help you integrate your service in one place.

    Availabe commands:
    /pocket - get pocket article
    /wakatime - get wakatime summary
    /shorturl - get short url
    /nba - get nba scores
    /mlb - get mlb scores
    /hn - get top 20 of hackernews
  `, Markup
      .keyboard([
        ['/pocket', '/wakatime'],
        ['/hn', '/mlb', 'nba'],
        ['🔍 Help']
      ])
      .oneTime()
      .resize()
      .extra()
  );
};

module.exports = defaultHandler;
