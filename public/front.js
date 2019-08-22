const evtSource = new EventSource('events');

evtSource.addEventListener('message', (e) => {
  console.log(e);
  const data = JSON.parse(e.data);
  player.loadVideoById({'videoId': data.id,
    'startSeconds': data.t});
}, false);

const onYouTubeIframeAPIReady = () => {
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

