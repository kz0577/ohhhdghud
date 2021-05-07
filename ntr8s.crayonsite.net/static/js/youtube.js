// https://developers.google.com/youtube/iframe_api_reference?hl=ja
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playerList = [];

function onYouTubeIframeAPIReady() {
    var videoClass = document.getElementsByClassName('videoBox');
    for(var i = 0; i < videoClass.length; i++) {
        var videoId = videoClass[i].firstElementChild.id;

        if(!videoId) continue; // 既存のYouTubeパーツは対象外

        var player = new YT.Player(videoId, {
            height: '315',
            width: '560',
            videoId: videoId,
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
        playerList.push(player);
    }
}

function onPlayerStateChange(event) {
    if(event.data === YT.PlayerState.PLAYING) {
        playerList.forEach(function (item, index, array) {
            if(event.target !== item) {
                item.pauseVideo();
            }
        });
    }
}
