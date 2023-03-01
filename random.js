// Set up YouTube player API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Set up array of search terms
var searchTerms = [
  "Fogo e Paixão Wando",
  "Wando Fogo e Paixão",
  "Wando - Fogo e Paixão",
  "Fogo e Paixão - Wando",
  "Wando Fogo e Paixão clipe",
  "Wando Fogo e Paixão completo"
];

// Pick a random search term
var searchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

// Set up YouTube player
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    height: '100%',
    width: '100%',
    videoId: '',
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// Load video based on search term
function loadVideo(searchTerm) {
  var url = 'https://www.googleapis.com/youtube/v3/search?' +
    'part=snippet&' +
    'maxResults=50&' +
    'q=' + encodeURIComponent(searchTerm) + '&' +
    'key=AIzaSyDEXoufIa_aKIFbwFQRiT7iR_L-SoQot-o';
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var videoId = data.items[Math.floor(Math.random() * data.items.length)].id.videoId;
      player.loadVideoById(videoId);
    });
}

// Handle player events
function onPlayerReady(event) {
  loadVideo(searchTerm);
  document.getElementById('fetch-button').addEventListener('click', function() {
    searchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    loadVideo(searchTerm);
  });
}
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    loadVideo(searchTerm);
  }
}
