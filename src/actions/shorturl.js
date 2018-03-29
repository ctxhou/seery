const turl = require('turl');
const outdent = require('outdent');

const shorturlHelper = async ({replyWithHTML}) => {
  replyWithHTML(outdent`
    <b>Shorturl service is here</b>

    Type /shorturl [url] to get the shorten url.
    <i>Ex: /shorturl https://google.com</i>
  `);
};

const shorturl = async ({replyWithHTML}, textMessage) => {
  const url = textMessage.replace('/shorturl', '').match(/([^\s]+)/)[1];
  const short = await turl.shorten(url);
  replyWithHTML(`Short url: ${short}`);
};

module.exports = {
  shorturl,
  shorturlHelper
};
