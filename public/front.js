const evtSource = new EventSource('events');

evtSource.addEventListener('message', (e) => {
  console.log(e);
  const data = JSON.parse(e.data);
  player.loadVideoById({'videoId': data.id,
    'startSeconds': data.t});
}, false);

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: 'd_T1StgldnM', // iwashi
    events: {
      'onReady': (e) => {
        e.target.playVideo();
      },
      'onStateChange': () => {
        // TODO: remember pause?
      },
    },
  });
};

const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
