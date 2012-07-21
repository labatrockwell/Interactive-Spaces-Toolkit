//no idea why this is here,
//it was in Brett's e-mail.
//probably just so we start off with a declared object and don't get js errors?
var YouTubeVideoController = function(model, view){
	BaseVideoController.call(this, model, view);
	this.view.setup(document.body); // move to BaseVideoController
};

YouTubeVideoController.prototype = LAB.inherit(BaseVideoController.prototype);
YouTubeVideoController.prototype.constructor = YouTubeVideoController;

YouTubeVideoController.prototype.load = function(videoID){
	this.videoID = videoID;
	getYouTubeDataAjax("http://gdata.youtube.com/feeds/api/videos/"+videoID+"?alt=json", this.YTDataCallback.bind(this));
	//url for reference
	//http://gdata.youtube.com/feeds/api/videos/MO_819DXjuc?alt=json-in-script&callback=youtubeFeedCallback&format=5
};

/** 
 * Load handlebars templates from external files
 */
getYouTubeDataAjax = function(path, callback) {
    $.ajax({
        url: path,
        dataType: "json",
        cache: false,
        success: callback
    });         
};

YouTubeVideoController.prototype.YTDataCallback = function(data){
	console.log("youtube gdata api response:");	
	console.log(data);

	var video_id = data.entry.id.$t.match(/(?=(http:\/\/gdata.youtube.com\/feeds\/api\/videos\/))?([\w\-]{11})/);
	this.model.videoId = video_id[0];	
	this.model.URL = this.videoID;
	this.model.title = data.entry.title.$t;
	this.model.description = data.entry.content.$t;

	this.view.load(this.model);
};