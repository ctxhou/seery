const hnApi = require('node-hn-api');
const outdent = require('outdent');

const normalize = (stories) => {
  return stories.map((story) => {
    const {title, url, score} = story;
    return {title, url, score};
  });
};

const template = (stories) => {
  return outdent`
    <b>Top 20 Hackernews articles</b>

    ${stories.map((story, index) => {
      return outdent`
        ${index + 1}. <a href="${story.url}">${story.title}</a> (${story.score})
      `;
    }).join('\n')}
  `;
};

const hn = async ({replyWithHTML}) => {
  const _stories = await hnApi.fetchTopStories(20);
  const stories = normalize(_stories);
  replyWithHTML(template(stories), {
    disable_web_page_preview: true
  });
};

module.exports = {
  hn
};

module.exports.normalize = normalize; // for test
