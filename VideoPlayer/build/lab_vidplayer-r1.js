// lab_vidplayer-r1.min.js - https://github.com/labatrockwell/Interactive-Spaces-Toolkit
/**
    Namespace
    
    http://elegantcode.com/2011/01/26/basic-javascript-part-8-namespaces/
*/ function namespace(namespaceString){var parts=namespaceString.split('.'),parent=window,currentPart='';for(var i=0,length=parts.length;i<length;i++){currentPart=parts[i];parent[currentPart]=parent[currentPart]||{};parent=parent[currentPart]}return parent};


(function() {
    var LT = namespace("com.rockwellgroup.lab.toolkit");

    /** 
        Lab Toolkit: A common set of utility functions and basic setup universal to all projects 
        @name LT
        @namespace LT
        @property {Object} Model
        @property {Object} Controller
        @property {Object} View
        @property {function} namespace("com.rockwellgroup.lab.toolkit")
        @property {Object} Util General group of utility functions
        @author <a href="mailto:jonah@paperequator.com">Jonah Model</a>
        @author <a href="mailto:eric@adaptedstudio.com">Eric Ishii Eckhardt</a>
    */

    LT.Model = LT.Model || {};
    LT.View = LT.View || {
        CID: 0 // can be used to create unique element ids
    };
    LT.UI = LT.UI || {};
    LT.Controller = LT.Controller || {};
    LT.Network = LT.Network || {};

    /**
        @memberOf LT
        @name LT.Util
        @namespace LT.Util
    */ 

    // Rockwell LAB
    LT.Util = {
        /**
            Creates inheretence for objects
            @function inherit
            @memberOf LT.Util
            @param {Object} p Must be non-null object, can't be a function
         */
        inherit: function(p) {
            if (p == null) return; // p must be a non-null object
            if (Object.create) { // If Object.create() is defined...
                return Object.create(p); // then just use it
            }
            var t = typeof p; // otherwise do some more type checking
            if (t !== "object" && t !== "function") throw TypeError();
            function f() {}; // define a dummy constructor function
            f.prototype = p; // Set its prototype property to p
            return new f(); // use f() to create an 'heir' of p.
        },
        
        /**
            Splits created variables from the querystring of a URL
            @function queryString
            @memberOf LT.Util
            @param {String} url
            @returns {Array} vars Every variable in an array of key value objects
        */ 
        queryString: function (url) {

            var vars = [], hash;
            var hashes = url.slice(url.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },

        /**
            Callback for script loader
            @function loadScript
            @memberOf LT.Util
            @deprecated We should probably use HeadJS or requireJS's loaded callbacks
            @param {String} _src
            @param {String} _callback
            @returns {Array} _callback Callback function, same as param
        */ 
        loadScript: function(_src, _callback) {
            var script;
            script = document.createElement('script');
            script.onload = function() {
              if (typeof _callback === "function") return _callback();
            };
            script.src = _src;
            return document.getElementsByTagName('head')[0].appendChild(script);
        }
    };

    /**
        In lieu of standard console.log
        @class LT.log
        @param {int} debug_level Options [LOG_ERROR, LOG_INFO, LOG_EVENTS, LOG_NARRATE, LOG_ALL]
        @param {String} _callback
        @returns {Array} _callback Callback function, same as param
    */ 
    var log_fn = console.log;
    LT.log = function() {
        if ( !LT.debug_level ) LT.debug_level = LT.Util.queryString(window.location.search).debug || 1;

        var args = Array.prototype.slice.call(arguments);
        if (typeof(args[0]) == "number") {
            console.log(LT.debug_level);
            if (LT.debug_level && args[0] <= LT.debug_level) {
                args = args.slice(1, args.length);
                console.log(args); 
            }
        } else {
            console.log(args);            
        }
    }


}).call(this);


/** 
    Options for Log Level are set via querystring: 1-5
    or in code: LOG_ERROR, LOG_INFO, LOG_EVENTS, LOG_NARRATE, LOG_ALL
*/
var LOG_ERROR = 1;
var LOG_INFO = 2;
var LOG_EVENTS = 3;
var LOG_NARRATE = 4;
var LOG_ALL = 5;

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

            // only for playlists :(
            try {                    
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
            } catch(e){}
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

   (function() {

    var LT = namespace("com.rockwellgroup.lab.toolkit");

    
    //------------------------------------------------------------ Video Model
    LT.Model.BaseVideo = function(id) {
        this.title = ""; // title of video
        this.description = ""; // description for video
        this.id = id; // local or remote id for video
        this.category = ""; // category of video for grouping/sorting/filtering
        this.thumbnail = ""; // video thumbnail image
        //@todo should video accept multiple categories?
    };
        
    /**
    * Initialize video model
    *
    * @stub
    */
    LT.Model.BaseVideo.prototype.initialize = function(_) {
        if (typeof(_) === "function") {
            _();   
        }
    };

    /**
    * Sets the video title
    *
    * @param {string} val The desired title of the video
    */
    LT.Model.BaseVideo.prototype.setTitle = function(val) {
        if (val) {
            this.title = val;            
        }
    };

    /**
    * Sets the video description
    *
    * @param {string} val The desired description for the video
    */
    LT.Model.BaseVideo.prototype.setDescription = function(val) {
        if (val) {
            this.description = val;            
        }
    };

    /**
    * Sets the video category
    *
    * @param {string} val The desired category for the video
    */
    LT.Model.BaseVideo.prototype.setCategory = function(val) {
        if (val) {
            this.category = val;            
        }
    };

    /**
    * Sets the video thumbnail
    *
    * @param {string} val The image for the video thumbnail
    */
    LT.Model.BaseVideo.prototype.setThumbnail = function(val) {
        if (val) {
            this.thumbnail = val;            
        }
    };

    //--------------------------------------------------------- Playlist Model
    LT.Model.BasePlaylist = function(id) {
        this.id = id; // local or remote id for playlist
        this.title = "";
        this.description = "";
        this.order = 0;
        this.collection = [];
        this.index = 0;
    };

    LT.Model.BasePlaylist.prototype = {
        
        /**
        * Initialize playlist model
        *
        * @stub
        */
        initialize: function(_) {
            _();
        },

        /**
        * Adds a video item to the playlist
        *
        * @param {string} video The video to be added to playlist
        */
        addItem: function(video) {
            console.log(LOG_INFO, "[Playlist] + ", video);
            this.collection.push(video);
        },

        setItemIndex: function(video_id) {
            
            if (!video_id) {
                console.log(LOG_ERROR, "[Playlist] Video is invalid", video_id);
                return;
            }
            
            // @todo optimize search
            for (var idx in this.collection) {
                var item = this.collection[idx];
                if (item.id === video_id) {
                    this.index = idx;
                }
            }
            
            // check if we have a binding for a video en
            console.log(LOG_NARRATE, "[Playlist] Updated active video to ", video_id, this.index, this.getItemActive());
        },
        
        /**
        * Gets the item at a particular index in playlist
        * 
        * @return {Video} The requested video object
        */
        getItemIndex: function() {
            return this.index;
        },

        /**
        * Gets the item at the last possible index (end of playlist)
        * 
        * @return {Video} The requested video object
        */
        getItemIndexLast: function() {
            return this.collection.length-1;
        },

        /**
        * Gets the item at a particular index in playlist
        * 
        * @return {Video} The requested video object
        */
        getItemAt: function(index) {
            return this.collection[index];
        },

        /**
        * Gets the item that is currently playing in playlist
        * 
        * @return {Video} The active video object
        */
        getItemActive: function() {
            return this.getItemAt(this.index);
        },


        /**
        * Gets the first item from the playlist
        * 
        * @return {Video} The video object
        */
        getItemFirst: function() {
            return this.getItemAt(0);
        },

        /**
        * Gets the total number of video items in the playlist
        *
        * @return {number} The number of videos in the playlist
        */
        getNumItems: function() {
            return this.collection.length;
        },

        /**
        * Converts collection into an array of video ids
        *
        * @return {array} An array of video IDs
        */
        getIdList: function() {
            var list = [];
            for (var idx in this.collection) {
                list.push(this.collection[idx].id);
            }
            return list;
        }
    };

}).call(this);(function() {
    var LT = namespace("com.rockwellgroup.lab.toolkit");
    
    //----------------------------------------------- Video Player Target View

    LT.View.BaseVideoPlayerTarget = function(screen_id, $el) {
        this.screen_id = screen_id;
        this.$el = $el; // references an element in the DOM
    };

    /**
    * Initialize video view
    *
    * @stub
    */
    LT.View.BaseVideoPlayerTarget.prototype.initialize = function(_) {
        if (typeof(_) === "function") {
            _();   
        }
    };

}).call(this);