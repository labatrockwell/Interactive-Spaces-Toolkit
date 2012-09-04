(function() {
    /**
        @namespace LT.Controller
    */
    var LT = namespace("com.rockwellgroup.lab.toolkit");

    /**
        Creates a new YouTubeController
        @constructor
        @param playlist
        @param {DOM Element} target
        @augments LT.Controller.VideoController
        @memberOf LT.Controller
    */ 
    LT.Controller.YouTubeController = function(playlist, target) {
        LT.Controller.BaseVideoController.call(this,playlist, target);
    };

    // inherit from BaseVideoController
    LT.Controller.YouTubeController.prototype = LT.Util.inherit(LT.Controller.BaseVideoController.prototype);
    

    //---------------------------------------------------------- Video Sources
    

    /**
    * Loads a video up by YouTube ID - Doesn't work right now - see loadSingleVideo()
    * @param {String} id YouTube Video ID
    */
    LT.Controller.YouTubeController.prototype.loadVideoById = function(id) {
        this.target.getYouTubePlayer().loadVideoById(id, 0, "highres");
    };

    /**
    * Loads a playlist by YouTube ID - Doesn't work right now
    * @param {String} id YouTube Video ID
    */
    LT.Controller.YouTubeController.prototype.loadPlaylist = function(id_list) {
        console.log(LOG_NARRATE, "[YouTubeController] Loading up playlist", id_list);
        this.target.getYouTubePlayer().loadPlaylist(id_list, 0, 0, "highres");
    };

    /**
    * Broadcasts Volume change along a Connection
    */
    LT.Controller.YouTubeController.prototype.setVolume = function(v) {
        console.log(LOG_NARRATE, "[VOLUME]2 ", v);
        this.target.setVolume(v);
    };

    /**
    * Receives Volume change from a Connection
    */
    LT.Controller.YouTubeController.prototype.getVolume = function() {
        console.log(LOG_NARRATE, "[GET VOLUME]2 ", this.target.getVolume() );
        this.target.getVolume();
    };

    /**
    * Starts playing a single video via a YouTube Player (whatever has been loaded)
    */
    LT.Controller.YouTubeController.prototype.playVideo = function() {
        console.log(LOG_NARRATE, "[YouTubeController] Playing Video");
        this.target.getYouTubePlayer().playVideo();
    };

    /**
    * Advances currently loaded playlist
    */
    LT.Controller.YouTubeController.prototype.nextVideo = function() {
        this.target.getYouTubePlayer().nextVideo();
    };
    
    /**
    * Backwards through currently loaded playlist
    */
    LT.Controller.YouTubeController.prototype.previousVideo = function() {
        this.target.getYouTubePlayer().previousVideo();
    };

    /**
    * Pauses video via a YouTube Player 
    */
    LT.Controller.YouTubeController.prototype.pauseVideo = function() {
        this.target.getYouTubePlayer().pauseVideo();
    };

    /**
    * Stops video via a YouTube Player
    */
    LT.Controller.YouTubeController.prototype.stopVideo = function() {
        this.target.getYouTubePlayer().stopVideo();
    };

    /**
    * Toggles playing state via a YouTube Player 
    */
    LT.Controller.YouTubeController.prototype.playOrPauseVideo = function() {
        var state = this.target.getYouTubePlayer().getPlayerState();
        if (state == 1) {
            this.pauseVideo();
        }
        else {    
            this.playVideo();
        }
    };

    /**
    * Clears YouTube Player video display 
    */
    LT.Controller.YouTubeController.prototype.clearVideo = function() {
        this.target.getYouTubePlayer().clearVideo();
    };

    
}).call(this);

   