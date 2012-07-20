// Events
var VideoPlayerEventType = {
	VIDEO_LOADED : "video_loaded",
	VIDEO_UNLOADED : "video_unloaded",
	VIDEO_STARTED : "video_started",
	VIDEO_STOPPED : "video_stopped",
	VIDEO_ENDED : "video_ended",
	VIDEO_LOOPED : "video_looped",
	VIDEO_SEEK : "video_seek"
};

var VideoPlayerEvent = function(){
	/** @param {VideoPlayerEventType} type */
	this.type;
};