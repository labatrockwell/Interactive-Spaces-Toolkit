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
        LT.Controller.VideoController.call(this, playlist, target);
    };

    // inherit from VideoController
    LT.Controller.YouTubeController.prototype = LT.Util.inherit(LT.Controller.VideoController.prototype);
    

    //-------------------------------------------------- Playlist Manipulation
    
    /**
    * Cues an entire playlist up (our playlist, not directly from YouTube)
    *
    */
    LT.Controller.YouTubeController.prototype.cuePlaylist = function() {
        var video_ids = this.playlist.getIdList();
        console.log("[YouTubeController] Cue videos: ", video_ids);
        this.target.getYouTubePlayer().cuePlaylist(video_ids);
    };

    /**
    * Cues a video up by YouTube ID
    * @param {String} id YouTube Video ID
    */
    LT.Controller.YouTubeController.prototype.cueVideoById = function(id) {
        this.target.getYouTubePlayer().cueVideoById(id, 0, "highres");
    };


    //-------------------------------------------------- Active Video Controls

    /**
    * Plays video via a YouTube Player 
    *
    */
    LT.Controller.YouTubeController.prototype.playVideo = function() {
        this.target.getYouTubePlayer().playVideo();
    };

    /**
    * Pauses video via a YouTube Player 
    *
    */
    LT.Controller.YouTubeController.prototype.pauseVideo = function() {
        this.target.getYouTubePlayer().pauseVideo();
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
    * Stops the active video via a YouTube Player 
    *
    */
    LT.Controller.YouTubeController.prototype.stopVideo = function() {
        this.target.getYouTubePlayer().stopVideo();
    };

    /**
    * Plays next available video via a YouTube Player 
    *
    */
    LT.Controller.YouTubeController.prototype.nextVideo = function() {
        this.target.getYouTubePlayer().nextVideo();
    };

    /**
    * Plays previous video via a YouTube Player 
    *
    */
    LT.Controller.YouTubeController.prototype.previousVideo = function() {
        this.target.getYouTubePlayer().previousVideo();
    };


    
}).call(this);

   