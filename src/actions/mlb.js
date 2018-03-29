const format = require('date-fns/format');
const outdent = require('outdent');
const MLBApi = require('node-mlb-api');
const {isUndefined} = require('lodash');

const normalize = (data) => {
  if (data.dates.length === 0) {
    return false;
  }
  const games = data.dates[0].games;
  return games.map((game) => {
    let winner = undefined;
    if (!isUndefined(game.teams.home.isWinner)) {
      winner = game.teams.home.isWinner ? 'home' : 'visitor';
    }
    return {
      gameId: game.gamePk,
      gameDate: game.gameDate,
      home: getTeamData(game.teams.home),
      visitor: getTeamData(game.teams.away),
      winner,
      isPlayed: winner ? true : false // if know who is winner, it played
    };
  });
  return normalizedGames;

  function getTeamData(team) {
    return {
      score: team.score,
      name: team.team.name
    };
  }
};

const getMlbRecord = (date) => {
  return MLBApi.getGames(format(date, 'MM/DD/YYYY'))
    .then(normalize);
};

const template = (record, date) => {
  if (!record) {
    return outdent`
      <b>There is no MLB match at ${format(date, 'YYYY-MM-DD')} </b>
    `;
  }

  function isPlayed(data, gameLink) {
    const template = [];
    if (data.winner === 'home') {
      template.push(`<b>${data.home.name}</b> vs ${data.visitor.name}`);
    } else {
      template.push(`${data.home.name} vs <b>${data.visitor.name}</b>`);
    }
    return [
      ...template,
      `${data.home.score}    :    ${data.visitor.score}`,
      `<a href="${gameLink}">Detail</a>`
    ].join('\n');
  }

  function isntPlayed(data, gameLink) {
    return outdent`
      ${data.home.name} vs ${data.visitor.name}
      Play at ${format(new Date(data.gameDate), 'hh:mm Z')}
      <a href="${gameLink}">Detail</a>
    `;
  }
  return outdent`
    <b>MLB scores in ${format(date, 'YYYY-MM-DD')}</b>

    ${record.map((data) => {
      const gameLink = `https://www.mlb.com/gameday/${data.gameId}`;
      return data.isPlayed ? isPlayed(data, gameLink) : isntPlayed(data, gameLink);
    }).join('\n\n')}
  `;
};

const mlbHelper = ({replyWithHTML}) => {
  replyWithHTML(outdent`
    <b>MLB service is here!</b>
    Here is the command you can use:

    * /mlb t: get scores of today
    * /mlb y: get scores of yesterday
    * /mlb tmr: get schedule of tomorrow
    * /mlb [date]: get scores/schedule at date (ex: /mlb 20180101)

    <i>note: please use YYYYMMDD format of the date query</i>
  `);
};

const mlb = async ({replyWithHTML}, date) => {
  const record = await getMlbRecord(date);
  replyWithHTML(template(record, date), {disable_web_page_preview: true});
};

const mlbError = async ({replyWithHTML}, date) => {
  replyWithHTML(outdent`
    <b>MLB service error</b>
    We faced error when parsing the ${date}.
    Please make sure you provide the correct date in <b>YYYYMMDD</b> format.

    You can type /mlb command to know more about this service.
  `);
};

module.exports = {
  mlbHelper,
  mlb,
  mlbError
};

module.exports.normalize = normalize; // for test
