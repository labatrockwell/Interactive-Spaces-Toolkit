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
            LT.log("fetch")
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

            LT.log(self);

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

            LT.log(self);

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

}).call(this);