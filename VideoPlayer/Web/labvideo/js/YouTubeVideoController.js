//no idea why this is here,
//it was in Brett's e-mail.
//probably just so we start off with a declared object and don't get js errors?
var YouTubeVideoController = function(model, view){
	BaseVideoController.call(this, model, view);
	this.view.setup();
};

YouTubeVideoController.prototype = LAB.inherit(BaseVideoModel.prototype);
YouTubeVideoController.prototype.constructor = YouTubeVideoController;

YouTubeVideoController.prototype.load = function(sGlobalObjPath, videoID){
	this.videoID = videoID;
	LAB.require("http://gdata.youtube.com/feeds/api/videos/"+videoID+"?alt=json-in-script&callback="+sGlobalObjPath+".YTDataCallback&format=5");
//url for reference
//http://gdata.youtube.com/feeds/api/videos/MO_819DXjuc?alt=json-in-script&callback=youtubeFeedCallback&format=5
};

YouTubeVideoController.prototype.YTDataCallback = function(data){
	console.log(data);
	this.model.URL = this.videoID;
	this.model.title = data.entry.title.$t;
	this.model.description = data.entry.content.$t;
	this.view.load(this.model);
};
