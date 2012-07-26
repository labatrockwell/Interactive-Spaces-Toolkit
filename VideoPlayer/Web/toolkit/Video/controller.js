(function() {
    var LT = namespace("com.rockwellgroup.lab.toolkit");

    //---------------------------------------------------- Playback Controller
    LT.Controller.VideoController = function(playlist, target) {
        this.playlist = playlist;
        this.target = target;
    }
    
    /**
    * Intialize video controller
    *
    */
    LT.Controller.VideoController.prototype.initialize = function (_) {

        var self = this;

        // dispatch events

        function onVideoChange(e, data) {
            // keep our playlist up to date based on video status
            self.playlist.setItemIndex(data.video_id);

            // trigger appropriate title and description change events
            var active_video = self.playlist.getItemActive();
            self.target.$el.trigger("video-title-changed", active_video.title);
            self.target.$el.trigger("video-description-changed", active_video.description);
        }

        function onVideoLoad(e, data) {
            // clear video title & description
            self.target.$el.trigger("video-title-changed", "");
            self.target.$el.trigger("video-description-changed", "");
        }

        self.target.$el.bind("video-cued", onVideoChange);
        self.target.$el.bind("video-playing", onVideoChange);
        self.target.$el.bind("video-loaded", onVideoLoad);

        // cues up playlist and get ready for playback
        self.cuePlaylist();

        _();
    };

    //-------------------------------------------------- Playlist Manipulation

   
    /**
     * Cues a playlist for the appropriate view
     *
     * @stub
     */
    LT.Controller.VideoController.prototype.cuePlaylist = function() {}

    /**
     * Cues up a specific video by url
     *
     * @stub
     */
    LT.Controller.VideoController.prototype.cueVideoById = function(id) {}
    

    //--------------------------------------------------- Full Screen Controls

    /**
     * Finds the appropriate view and tells it to go full screen
     *
     */
    LT.Controller.VideoController.prototype.goFullScreen = function() {
        this.target.goFullScreen();
    }

    
    /**
     * Whichever screen is playing as full screen, let's close that down
     *
     */
    LT.Controller.VideoController.prototype.leaveFullScreen = function() {
        this.target.leaveFullScreen();
    }

    //------------------------------------------------------ Playback Controls

    /**
    * Video play
    *
    * @stub
    */
    LT.Controller.VideoController.prototype.playVideo = function() {}

    /**
    * Video pause
    *
    * @stub
    */
    LT.Controller.VideoController.prototype.pauseVideo = function() {}

    /**
    * Video play/pause toggle
    *
    * @stub
    */
    LT.Controller.VideoController.prototype.playOrPauseVideo = function() {}
    
    /**
    * Video stop
    *
    * @stub
    */
    LT.Controller.VideoController.prototype.stopVideo = function() {}

    /**
    * Play previous video
    *
    * @stub
    */
    LT.Controller.VideoController.prototype.previousVideo = function() {}

    /**
    * Play next video
    *
    * @stub
    */
    LT.Controller.VideoController.prototype.nextVideo = function() {}
    



}).call(this);

   