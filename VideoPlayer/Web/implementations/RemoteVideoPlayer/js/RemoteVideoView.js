// This has to be served out of a webserver to work ... not local files 

var videoViewList = [];

var RemoteVideoView = function(_p){
 	this.v = {};
	this.v.url = "http://youtu.be/z_AbfPXTKms";
	this.v.id = "z_AbfPXTKms";
	this.v.title = "Fall of Maru";

	this.modest = 1;			// 	YouTube: Use smaller branding?
	this.rel = 0;				//	YouTube: Show related videos after first one is done?
	this.showinfo = 0;			//	YouTube: Show default info, aka Title and Stars before video?
	this.autoplay = 0;
	this.wrapper = "videoWrapper";	//	ID of container div
	this.playerId = 'ytPlayer';		//	ID of video player element
	//this.player;
}

RemoteVideoView.prototype = {
	constructor: RemoteVideoView,

	setup:function(_target, _params){
		if (_params) this.consumeParams(_params);		// Set default params for player

		videoViewList.push(this);
		this.player = new YT.Player(_target, {
			height: '390',
			width: '640',
			videoId: this.v.id,
			events: {
				'onReady': this.onPlayerReady,
				'onStateChange': this.onPlayerStateChange
			}
		});

	}, 
	load:function(_model, _params){
		//if (_params) this.consumeParams(_params);		// Reset default params if sent
		//console.log("Load Video:");
		console.log(_model);
		if (_model.videoId){
			this.v.id = _model.videoId;
		}
		this.stop();
		this.player.loadVideoById(this.v.id);
	},
	consumeParams:function(_p){
		if (_p.videoId) this.v.id = _p.videoId;
		if (_p.autoplay) this.autoplay = _p.autoplay;
		if (_p.modest) this.modest = _p.modest;
		if (_p.showinfo) this.showinfo = _p.showinfo;
		if (_p.rel) this.rel = _p.rel;
	},
	remove:function(_body){
		$(_target).remove(this.player);
	},
	play:function(){
		this.player.playVideo();
	}, 
	stop:function(){
		this.player.stopVideo();
	},
	onPlayerReady:function(){
		console.log("Player Ready");
	},
	onPlayerStateChange:function(_event){
		console.log("Player State Change");
		console.log(event);
	}
}

function onStateChange() {
	console.log("======================= CHANGED =======================");
}
function onytplayerStateChange() {
	console.log("======================= ME TOO =======================");
}


// 2. This code loads the IFrame Player API code asynchronously.
/*
var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
*/

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

/*
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
	  height: '390',
	  width: '640',
	  videoId: 'z_AbfPXTKms',
	  events: {
	    'onReady': onPlayerReady,
	    'onStateChange': onPlayerStateChange
	  }
	});
}
*/

// 4. The API will call this function when the video player is ready.
/*
function onPlayerReady(event) {
	event.target.playVideo();
}
*/

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

/*
var done = false;
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
	  setTimeout(stopVideo, 6000);
	  done = true;
	}
}
function playVideo() {
	player.playVideo();
}
function stopVideo() {
	player.stopVideo();
}
*/

/*
function onYouTubePlayerReady(){
	console.log("onYouTubePlayerReady");
}
*/

/*
onStateChange event: Player state changed to: "[object Object]" (playing)
loadVideoById(Zhawgd0REhA, parseInt(0), default);
onPlaybackQualityChange event: Playback quality changed to "[object Object]"
onStateChange event: Player state changed to: "[object Object]" (playing)
*/
