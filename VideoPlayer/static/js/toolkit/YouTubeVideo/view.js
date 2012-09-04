(function() {
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
    */
    LT.View.YouTubeTarget.prototype.initialize = function(_) {
        var self = this;

        // create a placeholder inside element
        self.id = "c" + LT.View.CID++;

        self.$el.html($("<div/>").prop("id", this.id));


        // create a YouTube Player widget
        self.yt_player = new YT.Player(self.id, {
            height: self.$el.height(),
            width: self.$el.width(),
            playerVars: {
                controls: 0, // hides bottom bar
                showinfo: 0, // hides top bar
                rel: 0, // hides suggested videos at end of playback
                iv_load_policy: 3 // hides annotations
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
        console.log("[VIEW] ", v);
        this.getYouTubePlayer().setVolume(v);
    };

    /**
    * Retreives volume level over connection
    * @return {Int} Volume level 0-100
    */
    LT.View.YouTubeTarget.prototype.getVolume = function(){
        console.log("[VIEW] getVolume ", this.getYouTubePlayer().getVolume() );
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