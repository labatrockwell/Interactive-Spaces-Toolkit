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
    * Fetches video metadata from YouTube and updates model accordingly 
    * only needed as a fall-back from interactive spaces, JSON, etc.
    *
    * @todo deprecate?
    */
    LT.Model.YouTubeVideo.prototype.fetch = function(_) {
        var self = this;
        console.log(LOG_NARRATE,"[SINGLE YT Video] Fetch", self);

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
                console.log(LOG_ERROR, "[YouTubeVideo] error", err);
                
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

        console.log(LOG_NARRATE,"[YT Video] YouTubePlaylist", this, id);
    };

    // inherit from Playlist
    LT.Model.YouTubePlaylist.prototype = LT.Util.inherit(LT.Model.BasePlaylist.prototype);

    /**
    * Update the model with new content
    *
    */
    LT.Model.YouTubePlaylist.prototype.update = function($data, _) {
        console.log(LOG_NARRATE,"[YT Playlist] UPDATE", $data);
        var self = this;
        
        if ($data){
            console.log(LOG_NARRATE, "[YT Playlist] Data Update");

            //console.log("Init from Admin", $data);
            //console.log($data.playlistTitle);
            //console.log($data.videoArray);
            //console.log(parseInt($data.playlistOrder));

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

            console.log(self);

            _();

        }
    }

    /**
    * Intialize model with starting content
    *
    */
    LT.Model.YouTubePlaylist.prototype.initialize = function(_, $data) {
        console.log(LOG_NARRATE,"[YT Playlist] Initialize", this, $data);

        var self = this;

        // @todo abstract this out to pull either from YouTube or IS Admin
        //$data = false;

    
        if ($data){
            console.log(LOG_NARRATE, "[YT Playlist] Data Initialize");

            console.log("Init from Admin", $data);
            console.log($data.playlistTitle);
            console.log($data.videoArray);
            console.log(parseInt($data.playlistOrder));

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

            console.log(self);

            _();

        } else {

            console.log(LOG_NARRATE, "[YT Playlist] Test Initialize");

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
                    console.log(LOG_ERROR, "[YouTubePlaylist] error", err);
                    _();
                }
            });

        }   
    };

}).call(this);