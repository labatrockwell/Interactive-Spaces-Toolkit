// lab_vidplayer_yt-r1.min.js - https://github.com/labatrockwell/Interactive-Spaces-Toolkit
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
        LT.log(LOG_NARRATE, "[YouTubeController] Loading up playlist", id_list);
        this.target.getYouTubePlayer().loadPlaylist(id_list, 0, 0, "highres");
    };

    /**
    * Broadcasts Volume change along a Connection
    */
    LT.Controller.YouTubeController.prototype.setVolume = function(v) {
        LT.log(LOG_NARRATE, "[VOLUME]2 ", v);
        this.target.setVolume(v);
    };

    /**
    * Receives Volume change from a Connection
    */
    LT.Controller.YouTubeController.prototype.getVolume = function() {
        LT.log(LOG_NARRATE, "[GET VOLUME]2 ", this.target.getVolume() );
        this.target.getVolume();
    };

    /**
    * Starts playing a single video via a YouTube Player (whatever has been loaded)
    */
    LT.Controller.YouTubeController.prototype.playVideo = function() {
        LT.log(LOG_NARRATE, "[YouTubeController] Playing Video");
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

   (function() {
    /**
        @namespace LT.Model
    */
    var LT = namespace("com.rockwellgroup.lab.toolkit");
    
    /**
        Creates a data model for a YouTubeVideo
        @constructor
        @param id
        @augments LT.Model.Video
        @memberOf LT.Model
    */ 
    LT.Model.YouTubeVideo = function(id) {
        LT.Model.BaseVideo.call(this, id);
    };

    // inherit from Video
    LT.Model.YouTubeVideo.prototype = LT.Util.inherit(LT.Model.BaseVideo.prototype);

    /**
    * Intialize model with starting content
    * @todo Add $data case...
    */
    LT.Model.YouTubeVideo.prototype.initialize = function(_, $data) {
        if ($data !== undefined){
            this.setTitle($data.entry.title.$t);
            this.setDescription($data.entry.content.$t);
            if (typeof(_) === "function") {
                _();   
            }
        } else if ( this.id ){
            LT.log(LOG_NARRATE,"fetch")
            this.fetch(_);            
        } else {
            if (typeof(_) === "function") {
                _();   
            }
        }
    };

    /**
    * Fetches video metadata from YouTube and updates model accordingly 
    * only needed as a fall-back from interactive spaces, JSON, etc.
    *
    * @todo deprecate?
    */
    LT.Model.YouTubeVideo.prototype.fetch = function(_) {
        var self = this;
        LT.log(LOG_NARRATE,"[SINGLE YT Video] Fetch", self);

        // @todo abstract this out to pull either from YouTube or IS Admin
        $.ajax({
            url: "http://gdata.youtube.com/feeds/api/videos/"+self.id+"?alt=json",
            dataType: "json",
            cache: false,
            success: function(rsp) {
                self.setTitle(rsp.entry.title.$t);
                self.setDescription(rsp.entry.content.$t);
                self.setThumbnail(rsp.entry.media$group.media$thumbnail[0].url);
                        
                if (typeof(_) === "function") {
                    _();   
                }
            },
            error: function(err) {
                LT.log(LOG_ERROR, "[YouTubeVideo] error", err);
                
                if (typeof(_) === "function") {
                    _();   
                }
            }
        });
    };


    /**
        Creates a data model for a YouTubePlaylist
        @constructor
        @param id
        @augments LT.Model.Playlist
        @memberOf LT.Model
    */ 
    LT.Model.YouTubePlaylist = function(id) {
        LT.Model.BasePlaylist.call(this, id);

        LT.log(LOG_NARRATE,"[YT Video] YouTubePlaylist", this, id);
    };

    // inherit from Playlist
    LT.Model.YouTubePlaylist.prototype = LT.Util.inherit(LT.Model.BasePlaylist.prototype);

    /**
    * Update the model with new content
    *
    */
    LT.Model.YouTubePlaylist.prototype.update = function($data, _) {
        LT.log(LOG_NARRATE,"[YT Playlist] UPDATE", $data);
        var self = this;
        
        if ($data){
            LT.log(LOG_NARRATE, "[YT Playlist] Data Update");

            //LT.log("Init from Admin", $data);
            //LT.log($data.playlistTitle);
            //LT.log($data.videoArray);
            //LT.log(parseInt($data.playlistOrder));

            self.title = $data.playlistTitle;
            //self.description = $data.playlistDescription;
            //self.order = parseInt($data.playlistOrder);
            self.collection = [];
            // store per-video meta
            var counter = 0;
            for (var idx in $data.videoArray) {
                var item = $data.videoArray[idx];
                var video = new LT.Model.YouTubeVideo(item.id);
                video.setTitle(item.title);
                video.setDescription(item.description);
                video.setCategory(item.category);
                video.setThumbnail(item.thumbnail || "http://img.youtube.com/vi/" + item.id + "/hqdefault.jpg");
                self.collection.push(video);
            }

            _();

        }
    }

    /**
    * Intialize model with starting content
    *
    */
    LT.Model.YouTubePlaylist.prototype.initialize = function(_, $data) {
        LT.log(LOG_NARRATE,"[YT Playlist] Initialize", this, $data);

        var self = this;

        // @todo abstract this out to pull either from YouTube or IS Admin
        //$data = false;

    
        if ($data){
            LT.log(LOG_NARRATE, "[YT Playlist] Data Initialize");

            LT.log("Init from Admin", $data);
            LT.log($data.playlistTitle);
            LT.log($data.videoArray);
            LT.log(parseInt($data.playlistOrder));

            self.title = $data.playlistTitle;
            self.description = $data.playlistDescription;
            self.order = parseInt($data.playlistOrder);

            // store per-video meta
            var counter = 0;
            for (var idx in $data.videoArray) {
                var item = $data.videoArray[idx];
                var video = new LT.Model.YouTubeVideo(item.id);
                video.setTitle(item.title);
                video.setDescription(item.description);
                video.setCategory(item.category);
                video.setThumbnail(item.thumbnail || "http://img.youtube.com/vi/" + item.id + "/hqdefault.jpg");
                self.addItem(video);
            }

            _();

        } else {

            LT.log(LOG_NARRATE, "[YT Playlist] Test Initialize");

            $.ajax({
                url: "./test/" + self.id + "-playlist.json",
                dataType: "json",
                cache: false,
                success: function(rsp) {

                    // set playlist meta
                    self.title = rsp.title;
                    self.description = rsp.description;
                    self.order = rsp.order;
                    
                    // store per-video meta
                    var counter = 0;
                    for (var idx in rsp.videos) {
                        var item = rsp.videos[idx];
                        var video = new LT.Model.YouTubeVideo(item.id);
                        video.setTitle(item.title);
                        video.setDescription(item.description);
                        video.setCategory(item.category);
                        video.setThumbnail(item.thumbnail || "http://img.youtube.com/vi/" + item.id + "/hqdefault.jpg");
                        self.addItem(video);
                    }
                    _();
                },
                error: function(err) {
                    LT.log(LOG_ERROR, "[YouTubePlaylist] error", err);
                    _();
                }
            });

        }   
    };

}).call(this);(function() {
    /**
        @namespace LT.View
    */
    var LT = namespace("com.rockwellgroup.lab.toolkit");
    
    
    /**
        The YouTube Player leverages YouTube's IFrame API, which enables access from the widest range of devices via HTML5
        @constructor
        @param id
        @augments LT.View.BaseVideoPlayerTarget
        @memberOf LT.View
    */ 
    LT.View.YouTubeTarget = function(screen_id,$el, _) {
        LT.View.BaseVideoPlayerTarget.call(this, screen_id, $el);
    };

    // inherit from VideoPlayerTarget
    LT.View.YouTubeTarget.prototype = LT.Util.inherit(LT.View.BaseVideoPlayerTarget.prototype);

    /**
    * Intializes the view
    * @param {function} _ Callback function
    * @param {Object} params (optional) Object mirroring YT Player options
    */
    LT.View.YouTubeTarget.prototype.initialize = function(_, params) {
        var self = this;
        var options = (params !== undefined ? params : {});
        var showControls = params.controls !== undefined ? params.controls : 0;
        var showInfo = params.showinfo !== undefined ? params.showinfo : 0;
        var relatedVideos = params.rel !== undefined ? params.rel : 0;
        var showCC = params.cc_load_policy !== undefined ? params.cc_load_policy : 0;
        var modestBranding = params.modestbranding !== undefined ? params.modestbranding : 1;

        // create a placeholder inside element
        self.id = "c" + LT.View.CID++;

        self.$el.html($("<div/>").prop("id", this.id));

        // create a YouTube Player widget
        self.yt_player = new YT.Player(self.id, {
            height: self.$el.height(),
            width: self.$el.width(),
            playerVars: {
                controls: showControls, // shows/hides bottom bar
                showinfo: showInfo, // shows/hides top bar
                rel: relatedVideos, // shows/hides suggested videos at end of playback
                modestbranding: 1,
                iv_load_policy: 3, // hides annotations
                cc_load_policy: showCC // shows/hides closed captioning
            },
            events: {
                onReady: _, // return as callback when player is ready
                onStateChange: function(state) {
                    var data = {};
                    // finds a video ID where available
                    if (state.target) {
                        if (state.target.getVideoUrl) {
                            data.video_id = self.getVideoId(state.target.getVideoUrl()); 
                            data.screen_id = self.screen_id;                           
                        }
                    }
                    if (state.data === -1) {
                        $(document).trigger("videoLoaded", data);
                    }
                    else if (state.data === 0) {
                        $(document).trigger("videoEnded", data);
                    }
                    else if (state.data === 1) {
                        $(document).trigger("videoPlaying", data);
                    }
                    else if (state.data === 2) {
                        $(document).trigger("videoPaused", data);
                    }
                    else if (state.data === 3) {
                        $(document).trigger("videoBuffering", data);                        
                    }
                    else if (state.data === 5) {
                        $(document).trigger("videoCued", data);                        
                    }
                }
            }
        });
    };

    /**
    * Finds the saved YouTube Video Player
    * @return {object} A YouTube Player widget
    */
    LT.View.YouTubeTarget.prototype.getYouTubePlayer = function() {
        return this.yt_player;
    };


    /**
    * Finds the YouTube Video URL within a URL
    * @return {string} A YouTube Video ID
    */
    LT.View.YouTubeTarget.prototype.getVideoId = function(url) {
        var qs = LT.Util.queryString(url);
        if (qs.v) return qs.v;
    };
    
    /**
    * Finds the appropriate view and tells it to go full screen
    */
    LT.View.YouTubeTarget.prototype.goFullScreen = function() {
        this.original_height = this.$el.height();
        this.original_width = this.$el.width();
        this.getYouTubePlayer().setSize($(window).width(), $(window).height());
        this.$el.addClass("full-screen");
    };

    /**
    * Sends volume message along connection
    * @param {Int} v Volume level 0-100
    */
    LT.View.YouTubeTarget.prototype.setVolume = function(v){
        LT.log("[VIEW] ", v);
        this.getYouTubePlayer().setVolume(v);
    };

    /**
    * Retreives volume level over connection
    * @return {Int} Volume level 0-100
    */
    LT.View.YouTubeTarget.prototype.getVolume = function(){
        LT.log("[VIEW] getVolume ", this.getYouTubePlayer().getVolume() );
        return this.getYouTubePlayer().getVolume();
    };

    /**
    * Whichever screen is playing as full screen, let's close that down
    */
    LT.View.YouTubeTarget.prototype.leaveFullScreen = function() {
        this.getYouTubePlayer().setSize(this.original_width, this.original_height);
        this.$el.removeClass("full-screen");

    };


}).call(this);