const outdent = require('outdent');

const defaultHandler = ({replyWithHTML}) => {
  replyWithHTML(outdent`
    Hi, I am Seery bot. I can help you integrate your service in one place.

    Availabe commands:
    /pocket - get pocket article
    /wakatime - get wakatime summary
    /shorturl - get short url
    /nba - get nba scores
  `);
};

module.exports = defaultHandler;
