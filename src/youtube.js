const {RTMClient, WebClient} = require('@slack/client');
const Youtube = require('youtube-api');
const creds = require('./credentials.json');
const EventEmitter = require('events');

const rtm = new RTMClient(creds.SLACK_TOKEN);
const slack = new WebClient(creds.SLACK_TOKEN);

Youtube.authenticate({
  type: 'key',
  key: creds.YOUTUBE_TOKEN,
});

const lyrics = new EventEmitter();

const routes = async (fastify, options) => {
  fastify.get('/events', (request, reply) => {
    lyrics.on('song', ({video, t}) => {
      reply.sse({id: video, t});
    });
  });
};

rtm.on('message', async (message) => {
  if (message.channel !== creds.CHANNEL_SANDBOX) {
    return;
  }
  if (message.username !== '歌詞検索くん') {
    return;
  }
  const fields = message.attachments[0].fields;
  const title = fields.find(({title}) => title === '曲名').value;
  const singer = fields.find(({title}) => title === '歌手').value;
  const video = (await new Promise((resolve, reject) => {
    Youtube.search.list({part: 'id', type: 'video', q: [title, singer].join(' ')}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })).items[0].id.videoId;
  lyrics.emit('song', {video, t: 0});
});

module.exports = routes;

rtm.start();
/*


(async () => {
  console.log((await new Promise((resolve, reject) => {
    Youtube.search.list({part: 'id', type: 'video', q: 'plenty 少年'}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })).items[0].id.videoId);
})();
*/