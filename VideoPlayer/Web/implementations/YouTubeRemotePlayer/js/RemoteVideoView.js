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

	this.oheight = 390; // original height, full-screen may alter
	this.owidth = 640; // original width, full-screen may alter
}

RemoteVideoView.prototype = {
	constructor: RemoteVideoView,

	setup:function(_target, _params){
		if (_params) this.consumeParams(_params);		// Set default params for player

		videoViewList.push(this);
		this.player = new YT.Player(_target, {
			height: this.oheight,
			width: this.owidth,
			videoId: this.v.id,
			playerVars: {
				controls: "0",
				showinfo: this.showinfo
			},
			events: {
				'onReady': this.onPlayerReady,
				'onStateChange': this.onPlayerStateChange
			}
		});

	}, 
	load:function(_model, _params){
		//console.log("[Remote Video View]", _model);
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
	goFullscreen: function() {

		/// Hides the scroll bar
		$("body").addClass("no-scroll");

		// Add class for position and z-index 
		$("#video-player").addClass("fs");

		// scale dimensions out to match window
		var max_width = $(window).width();
		var max_height = $(window).height();
		var aspect_ratio = this.owidth / this.oheight;
		
		// assumes 16:9 or 4:3 aspect ratios
		// wider than tall
		var h = max_height;
		var w = max_width/aspect_ratio; 

		// resize video accordingly to match full screen
		this.player.setSize(w,h);

		// show a backdrop in case video falls short of full window for any reason
		$("#full-screen-backdrop").show();
	},
	leaveFullscreen: function() {

		/// restore default scroll-bar behavior & dimensions
		$("body").removeClass("no-scroll");

		$("#video-player").removeClass("fs");
		
		// restore to original dimensions
		this.player.setSize(this.owidth, this.oheight);
		
		// hide video backdrop
		$("#full-screen-backdrop").hide();
	},
	toggleFullscreen: function() {
		if ($("#full-screen-backdrop").is(":visible")) {
			this.leaveFullscreen();
		}
		else {
			this.goFullscreen();
		}
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