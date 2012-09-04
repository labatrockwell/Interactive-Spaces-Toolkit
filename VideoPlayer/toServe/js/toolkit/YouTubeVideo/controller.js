(function() {
    var LT = namespace("com.rockwellgroup.lab.toolkit");

    //---------------------------------------------------- YouTube Controller
    LT.Controller.YouTubeController = function(playlist, target) {
        LT.Controller.BaseVideoController.call(this,playlist, target);
    };

    // inherit from BaseVideoController
    LT.Controller.YouTubeController.prototype = LT.Util.inherit(LT.Controller.BaseVideoController.prototype);
    

    //---------------------------------------------------------- Video Sources
    

    /**
    * Cues a video up by YouTube ID
    *
    */
    LT.Controller.YouTubeController.prototype.loadVideoById = function(id) {
        this.target.getYouTubePlayer().loadVideoById(id, 0, "highres");
    };

    LT.Controller.YouTubeController.prototype.loadPlaylist = function(id_list) {
        console.log(LOG_NARRATE, "[YouTubeController] Loading up playlist", id_list);
        this.target.getYouTubePlayer().loadPlaylist(id_list, 0, 0, "highres");
    };


    LT.Controller.YouTubeController.prototype.cuePlaylist = function(id_list) {
        console.log(LOG_NARRATE, "[YouTubeController] Cue up playlist", id_list);
        this.target.getYouTubePlayer().cuePlaylist(id_list, 0, 0, "highres");
    };


    //-------------------------------------------------- Active Video Controls

    /**
    * Plays a single video via a YouTube Player 
    *
    */
    LT.Controller.YouTubeController.prototype.setVolume = function(v) {
        console.log(LOG_NARRATE, "[VOLUME]2 ", v);
        this.target.setVolume(v);
    };

    LT.Controller.YouTubeController.prototype.getVolume = function() {
        console.log(LOG_NARRATE, "[GET VOLUME]2 ", this.target.getVolume() );
        this.target.getVolume();
    };


    //-------------------------------------------------- Active Video Controls

    /**
    * Plays a single video via a YouTube Player 
    *
    */
    LT.Controller.YouTubeController.prototype.playVideo = function() {
        console.log(LOG_NARRATE, "[YouTubeController] Playing Video");
        this.target.getYouTubePlayer().playVideo();
    };

    LT.Controller.YouTubeController.prototype.nextVideo = function() {
        this.target.getYouTubePlayer().nextVideo();
    };
    
    LT.Controller.YouTubeController.prototype.previousVideo = function() {
        this.target.getYouTubePlayer().previousVideo();
    };

    /**
    * Pauses video via a YouTube Player 
    *
    */
    LT.Controller.YouTubeController.prototype.pauseVideo = function() {
        this.target.getYouTubePlayer().pauseVideo();
    };

    /**
    * Stops video via a YouTube Player 
    *
    */
    LT.Controller.YouTubeController.prototype.stopVideo = function() {
        this.target.getYouTubePlayer().stopVideo();
    };

    /**
    * Plays or pauses video via a YouTube Player 
    *
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
    *
    */
    LT.Controller.YouTubeController.prototype.clearVideo = function() {
        this.target.getYouTubePlayer().clearVideo();
    };

    
}).call(this);

   