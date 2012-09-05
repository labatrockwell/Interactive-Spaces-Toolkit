/**	
* @constructor
*/
var SimplePlayer = function(){
	var LT = namespace("com.rockwellgroup.lab.toolkit");
	var $el;
	var model, view, controller;
	var current_video;

	this.init = function( $e, video_id ){
		current_video = video_id;
		$el = $e;
	    console.log(LOG_NARRATE, "[YouTubePlayer] Launching app...");
	    initializeModel(function() {
	        initializeView(function() {
	            // let's get the app setup...
	            initializeController(onReady);
	        });
	    }, current_video);
	}

	this.loadVideo = function( id ){
		model = new LT.Model.YouTubeVideo(id);
	    model.initialize(function(){
	    	console.log(model)
	    	console.log(view)
	    	console.log(controller)
			controller.loadVideoById( model.id );
	    }.bind(this));
	}

	// when the app is ready, we will run this...
	function onReady() {
	    // Load and play all videos
	    controller.loadVideoById( model.id );
	};

	// prepares YouTubeVideo model
	function initializeModel(callback, video_id) {
	    console.log(LOG_NARRATE, "[YouTubePlayer] <model>");

        // let's make our model based on playlist ID
        console.log(LOG_INFO, "[YouTubePlayer] Loading video of ID " + video_id + "...");
        model = new LT.Model.YouTubeVideo(video_id);
        model.initialize(callback);	    	

	};

	// prepares YouTubeTarget view
	function initializeView(callback) {
	    // our target references YouTube's video player HTML
	    view = new LT.View.YouTubeTarget(current_video, $el);
		// let's setup our view, now...
	    view.initialize(callback, {cc_load_policy:1});
	};

	// prepares YouTubeController
	function initializeController(callback) {
	    controller = new LT.Controller.YouTubeController(model, view);
	    controller.initialize(function() {
	        console.log("INIT CONTROLLER!");
	        // now bring the player full-screen right away
	        controller.goFullScreen();
	        controller.setVolume(50);
	        onReady();
	    });
	};
};

var player;

$(window).bind("load", function() {
	player = new SimplePlayer();
	player.init($("#yt-video"), "858uS_Z8yeI");
});