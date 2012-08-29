var YouTubeVideoController = function(model, view){
    var self = this;

    // extend from base and enables setup to be called below
	BaseVideoController.call(self, model, view);

    // lazy load api
    var $api = $("<script/>").prop("src", "http://www.youtube.com/iframe_api");
    $api.insertAfter($("script").first());

    // when youtube api is ready...
    window.onYouTubeIframeAPIReady = function() {
        self.view.setup(document.getElementById("video-player-placeholder"));
    }
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