const format = require('date-fns/format');
const outdent = require('outdent');
const nbaClinet = require('nba-stats-client');

const normalize = (data) => {
  const games = data.sports_content.games.game;
  const normalizedGames = games.map((game) => {
    const {visitor, home} = game;
    const result = {
      home: {
        name: home.team_key,
        score: home.score
      },
      visitor: {
        name: visitor.team_key,
        score: visitor.score
      },
      periodTime: game.period_time,
      winner: null,
      isPlayed: false,
      gameTime: game.time
    };
    // means the game is played
    if (visitor.score) {
      result.winner = parseInt(home.score) > parseInt(visitor.score) ? 'home' : 'visitor';
      result.isPlayed = true;
    }
    return result;
  });
  return normalizedGames;
};

const formatDate = (date) => {
  return format(date, 'YYYY-MM-DD');
};

const createNBALink = (date, home, visitor) => {
  const formatdate = format(date, 'YYYYMMDD');
  return `https://watch.nba.com/game/${formatdate}/${visitor}${home}`;
};

const getNbaRecord = (date) => {
  return nbaClinet.getGamesFromDate(date)
    .then(normalize);
};

const template = (record, date) => {
  function isPlayed(data, gameLink) {
    let team = '';
    if (data.winner === 'home') {
      team += `<b>${data.home.name}</b> vs ${data.visitor.name}`;
    } else {
      team += `${data.home.name} vs <b>${data.visitor.name}</b>`;
    }
    // is playing
    if (data.periodTime.game_status === '2') {
      team += ` (${data.periodTime.period_status} ${data.periodTime.game_clock})`;
    }

    return [
      team,
      `${data.home.score}    :    ${data.visitor.score}`,
      `<a href="${gameLink}">Detail</a>`
    ].join('\n');
  }

  function isntPlayed(data, gameLink) {
    return outdent`
      ${data.home.name} vs ${data.visitor.name} | Play at ${data.gameTime}
      <a href="${gameLink}">Detail</a>
    `;
  }
  return outdent`
    <b>NBA scores in ${formatDate(date)}</b>

    ${record.map((data) => {
      const gameLink = createNBALink(date, data.home.name, data.visitor.name);
      return data.isPlayed ? isPlayed(data, gameLink) : isntPlayed(data, gameLink);
    }).join('\n\n')}
  `;
};

const nbaHelper = ({replyWithHTML}) => {
  replyWithHTML(outdent`
    <b>NBA service is here!</b>
    Here is the command you can use:

    * /nba t: get scores of today
    * /nba y: get scores of yesterday
    * /nba tmr: get schedule of tomorrow
    * /nba [date]: get scores/schedule at date (ex: /nba 20180101)

    <i>note: please use YYYYMMDD format of the date query</i>
  `);
};

const nba = async ({replyWithHTML}, date) => {
  const record = await getNbaRecord(date);
  if (record.length) {
    replyWithHTML(template(record, date), {disable_web_page_preview: true});
  } else {
    replyWithHTML(`<b>There is no NBA game in ${formatDate(date)}</b>`);
  }
};

const nbaError = async ({replyWithHTML}, date) => {
  replyWithHTML(outdent`
    <b>NBA service error</b>
    We faced error when parse the ${date} you just input.
    Please make sure you provide the correct date in <b>YYYYMMDD</b> format.

    You can type /nba command to know more about this service.
  `);
};

module.exports = {
  nbaHelper,
  nba,
  nbaError
};

module.exports.normalize = normalize; // for test
