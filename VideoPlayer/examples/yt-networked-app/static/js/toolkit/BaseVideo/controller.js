(function() {
    var LT = namespace("com.rockwellgroup.lab.toolkit");
    var ns = namespace("com.rockwellgroup.lab.toolkit.Controller");

    //---------------------------------------------------- Video Controller
    LT.Controller.BaseVideoController = function(playlist,target) {
        this.playlist = playlist;
        this.target = target;
    };
    
    /**
    * Intialize video controller
    *
    */
    ns.BaseVideoController.prototype.initialize = function (_) {

        var self = this;


        function onVideoLoaded(e, data) {
            $(document).trigger("videoTitleChanged", "");
            $(document).trigger("videoDescriptionChanged", "");
        }


        // dispatch events
        function onVideoPlaying(e, data) {

            // sets active playlist item
            self.playlist.setItemIndex(data.video_id);

            // trigger appropriate title and description change events
            var active_video = self.playlist.getItemActive();
            $(document).trigger("videoTitleChanged", active_video.title);
            $(document).trigger("videoDescriptionChanged", active_video.description);

            if (self.playlist.getItemIndex() == self.playlist.getItemIndexLast()) {
                console.log(LOG_NARRATE, "[BaseVideo] Playlist ends after this one", data);
                // @todo remove this binding after complete
                var binding = $(document).bind("videoEnded", function() {
                     self.clearVideo();
                     if (typeof(self.onPlaylistEnd) == "function") {
                         self.onPlaylistEnd();
                         self.onPlaylistEnd = null;                        
                     }
                });
            }
        }

        function onVideoEnded(e, data) {
            // possibly send callback for onVideoEnd and clear event binding
            if (typeof(self.onVideoEnd) === "function") {
                self.clearVideo();
                self.onVideoEnd();
                self.onVideoEnd = null;
                return;
            }
        }

        $(document).bind("videoPlaying", onVideoPlaying);
        $(document).bind("videoEnded", onVideoEnded);
        $(document).bind("videoLoaded", onVideoLoaded);

        if (typeof(_) === "function") {
            _();   
        }
    };

    //--------------------------------------------------- Audio Controls

    /**
     * Set the audio to value passed in
     *
     */
    LT.Controller.BaseVideoController.prototype.setVolume = function(v) {
        console.log("[CONTROLLER]2 ", v, 50);
        this.target.setVolume(v);
    };

    LT.Controller.BaseVideoController.prototype.getVolume = function() {
        this.target.getVolume();
    };


    //--------------------------------------------------- Full Screen Controls

    /**
     * Finds the appropriate view and tells it to go full screen
     *
     */
    LT.Controller.BaseVideoController.prototype.goFullScreen = function() {
        this.target.goFullScreen();
    };

    
    /**
     * Whichever screen is playing as full screen, let's close that down
     *
     */
    LT.Controller.BaseVideoController.prototype.leaveFullScreen = function() {
        this.target.leaveFullScreen();
    };

    //---------------------------------------------------------- Video Sources

 
    
    /**
     * Loads and plays the first item in the playlist
     *
     *
     */
    LT.Controller.BaseVideoController.prototype.loadFirstVideo = function(_) {
        var video = this.playlist.getItemFirst();
        console.log(LOG_NARRATE, "[BaseVideoController] Loading first video", video);
        this.loadSingleVideo(video.id, _);
    };


    /**
    * Loads and plays a single video from playlist based on video ID
    *
    *
    */
    LT.Controller.BaseVideoController.prototype.loadSingleVideo = function(video_id, _) {
        console.log(LOG_NARRATE, "[BaseVideoController] Play a single video and stop", video_id);
        this.onVideoEnd = _;
        this.onPlaylistEnd = null;
        this.loadVideoById(video_id);
    };

  
    /**
    * Loads and plays all videos from playlist
    *
    */
    LT.Controller.BaseVideoController.prototype.loadAllVideos = function(_) {
        console.log(LOG_NARRATE, "[BaseVideoController] Play all videos and stop", this.playlist.getIdList());
        this.onPlaylistEnd = _;
        this.onVideoEnd = null;
        this.loadPlaylist(this.playlist.getIdList());
    };
   
    /**
    * Loads and plays a specific video by id
    *
    * @stub
    */
    LT.Controller.BaseVideoController.prototype.loadVideoById = function(id) {};
    
    /**
     * Loads and plays an entire playlist
     *
     * @stub
     */
    LT.Controller.BaseVideoController.prototype.loadPlaylist = function(id_list) {};


    //------------------------------------------------------ Playback Controls

    /**
    * Video play
    *
    */
    LT.Controller.BaseVideoController.prototype.playVideo = function() {};

    /**
    * Video pause
    *
    * @stub
    */
    LT.Controller.BaseVideoController.prototype.pauseVideo = function() {};


    /**
    * Video stop
    *
    * @stub
    */
    LT.Controller.BaseVideoController.prototype.stopVideo = function() {};

    /**
    * Video play/pause toggle
    *
    * @stub
    */
    LT.Controller.BaseVideoController.prototype.playOrPauseVideo = function() {};
    
  
    /**
    * Play next video
    *
    * @stub
    */
    LT.Controller.BaseVideoController.prototype.nextVideo = function() {};
    
    /**
    * Play previous video
    *
    * @stub
    */
    LT.Controller.BaseVideoController.prototype.previousVideo = function() {};

    /**
    * Clear video display
    *
    * @stub
    */
    LT.Controller.BaseVideoController.prototype.clearVideo = function() {};



}).call(this);

   