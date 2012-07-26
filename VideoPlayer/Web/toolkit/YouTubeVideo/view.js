(function() {
    var LT = namespace("com.rockwellgroup.lab.toolkit");
    
    //---------------------------------------------------- YouTube Screen View

    // The YouTube Player leverages YouTube's IFrame API, which enables access
    // from the widest range of devices via HTML5

    LT.View.YouTubeTarget = function($el, _) {
        LT.View.VideoPlayerTarget.call(this, $el);
    }

    // inherit from VideoPlayerTarget
    LT.View.YouTubeTarget.prototype = LT.Util.inherit(LT.View.VideoPlayerTarget.prototype);

    /**
    * Intialize view
    *
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
                iv_load_policy: 3 // hides annotations
            },
            events: {
                onReady: _, // return as callback when player is ready
                onStateChange: function(state) {
                    var data = {};
                    // finds a video ID where available
                    if (state.target) {
                        console.log(state.target.getVideoUrl());
                        if (state.target.getVideoUrl) {
                            data.video_id = self.getVideoId(state.target.getVideoUrl());                            
                        }
                    }
                    if (state.data === -1) {
                        self.$el.trigger("video-loaded", data);
                    }
                    else if (state.data === 0) {
                        self.$el.trigger("video-ended", data);
                    }
                    else if (state.data === 1) {
                        self.$el.trigger("video-playing", data);
                    }
                    else if (state.data === 2) {
                        self.$el.trigger("video-paused", data);
                    }
                    else if (state.data === 3) {
                        self.$el.trigger("video-buffering", data);                        
                    }
                    else if (state.data === 5) {
                        self.$el.trigger("video-cued", data);                        
                    }
                }
            }
        });
    }

    /**
    * Finds the saved YouTube Video Player
    *
    * @return {object} A YouTube Player widget
    */
    LT.View.YouTubeTarget.prototype.getYouTubePlayer = function() {
        return this.yt_player;
    }


    /**
    * Finds the YouTube Video URL within a URL
    *
    * @return {string} A YouTube Video ID
    */
    LT.View.YouTubeTarget.prototype.getVideoId = function(url) {
        var qs = LT.Util.queryString(url);
        if (qs.v) return qs.v;

    }
    
    /**
    * Finds the appropriate view and tells it to go full screen
    *
    */
    LT.View.YouTubeTarget.prototype.goFullScreen = function() {
        this.original_height = this.$el.height();
        this.original_width = this.$el.width();
        this.getYouTubePlayer().setSize($(window).width(), $(window).height());
        this.$el.addClass("full-screen");
    }

    /**
    * Whichever screen is playing as full screen, let's close that down
    *
    */
    LT.View.YouTubeTarget.prototype.leaveFullScreen = function() {
        this.getYouTubePlayer().setSize(this.original_width, this.original_height);
        this.$el.removeClass("full-screen");

    }


}).call(this);