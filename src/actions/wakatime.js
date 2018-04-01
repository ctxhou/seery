const {WakaTime} = require('wakatime');
const format = require('date-fns/format');
const startOfWeek = require('date-fns/start_of_week');
const lastDayOfWeek = require('date-fns/last_day_of_week');
const subWeeks = require('date-fns/sub_weeks');
const {getUser, saveToken} = require('../model/user');
const {secondsToHourMin} = require('../utils/time');
const {
  sendGetTokenMessage,
  sendSelectRangeMessage
} = require('../messages/wakatime');

const getWakaTimeInstance = (token) => {
  return new WakaTime(token);
};

const getToken = async (telegramId) => {
  const user = await getUser(telegramId);
  return user.wakatimeToken;
};

const formatTime = (time) => {
  return format(time, 'YYYY-MM-DD HH:mm');
};

const regularTime = (res) => {
  const data = {
    totalSeconds: 0,
    projects: {},
    start: res.start,
    end: res.end
  };
  res.data.forEach((item) => {
    data.totalSeconds += item.grand_total.total_seconds;
    item.projects.forEach((p) => {
      data.projects[p.name] = data.projects[p.name] ?
        data.projects[p.name] + p.total_seconds :
        p.total_seconds;
    });
  });

  // sort projects by time
  const projects = [];
  for (let pro in data.projects) {
    if (data.projects[pro]) {
      projects.push([pro, data.projects[pro]]);
    }
  }

  projects.sort((a, b) => {
    return b[1] - a[1];
  });
  data.projects = projects;
  return data;
};

const genText = (re) => {
  const data = regularTime(re);
  return `
Wakatime report from ${formatTime(data.start)} to ${formatTime(data.end)}:

<b>Total Time: ${secondsToHourMin(data.totalSeconds)}</b>

<b>Project Time:</b>
<code>
${data.projects.map((project) =>
      `．${project[0]}: ${secondsToHourMin(project[1])}`
    ).join('\n')}
</code>
`;
};

const wakatime = async ({message, replyWithHTML}) => {
  const telegramId = message.from.id;
  const token = await getToken(telegramId);
  if (token.length === 0) {
    sendGetTokenMessage(replyWithHTML);
  } else {
    sendSelectRangeMessage(replyWithHTML);
  }
};

const wakatimeAuth = async ({message, replyWithHTML}) => {
  const telegramId = message.from.id;
  const [command, token] = message.text.split(' '); // eslint-disable-line
  if (!token) {
    replyWithHTML(`You need to input the token after /wakatime_auth`);
  } else {
    const user = await saveToken(telegramId, 'wakatimeToken', token);
    if (user) {
      replyWithHTML(`Great job! Now you can start to use wakatime service: /wakatime`);
    } else {
      replyWithHTML(`Sorry, we have the problem to save your wakatime token.`);
      console.error('ERROR to save wakatime token');
    }
  }
};
const wakatimeToday = async ({callbackQuery, replyWithHTML, answerCbQuery}) => {
  const telegramId = callbackQuery.from.id;
  try {
    const token = await getToken(telegramId);
    const result = await getWakaTimeInstance(token).summaries(new Date());
    const text = genText(result);
    replyWithHTML(text);
    answerCbQuery('ok');
  } catch (e) {
    console.log('error:', e);
  }
};

const wakatimeLastweek = async ({callbackQuery, replyWithHTML, answerCbQuery}) => {
  const telegramId = callbackQuery.from.id;
  const token = await getToken(telegramId);
  const lastWeek = subWeeks(new Date(), 1);
  const startDay = startOfWeek(lastWeek);
  const lastDay = lastDayOfWeek(lastWeek);
  const result = await getWakaTimeInstance(token).summaries({start: startDay, end: lastDay});
  const text = genText(result);
  replyWithHTML(text, {parse_mode: 'HTML'});
  answerCbQuery('ok');
};

module.exports = {
  wakatime,
  wakatimeAuth,
  wakatimeToday,
  wakatimeLastweek
};
module.exports.regularTime = regularTime;
module.exports.genText = genText;
