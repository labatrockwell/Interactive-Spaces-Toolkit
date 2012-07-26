(function() {
    var LT = namespace("com.rockwellgroup.lab.toolkit");
    
    //---------------------------------------------------- YouTube Video Model

    LT.Model.YouTubeVideo = function(id) {
        LT.Model.Video.call(this, id);
    }

    // inherit from Video
    LT.Model.YouTubeVideo.prototype = LT.Util.inherit(LT.Model.Video.prototype);


    /**
    * Fetches video metadata from YouTube and updates model accordingly 
    * only needed as a fall-back from interactive spaces, JSON, etc.
    *
    * @todo deprecate?
    */
    LT.Model.YouTubeVideo.prototype.fetch = function(_) {
        var self = this;

        // @todo abstract this out to pull either from YouTube or IS Admin
        $.ajax({
            url: "http://gdata.youtube.com/feeds/api/videos/"+self.id+"?alt=json",
            dataType: "json",
            cache: false,
            success: function(rsp) {
                self.setTitle(rsp.entry.title.$t);
                self.setDescription(rsp.entry.content.$t);
                _();
            },
            error: function(err) {
                console.log("[YouTubeVideo] error", err);
                _();
            }
        });
    }

    //------------------------------------------------- YouTube Playlist Model

    LT.Model.YouTubePlaylist = function(id) {
        LT.Model.Playlist.call(this, id);
    }

    // inherit from Playlist
    LT.Model.YouTubePlaylist.prototype = LT.Util.inherit(LT.Model.Playlist.prototype);

    /**
    * Intialize model
    *
    */
    LT.Model.YouTubePlaylist.prototype.initialize = function( _) {

        var self = this;

        // @todo abstract this out to pull either from YouTube or IS Admin
        $.ajax({
            url: "./mock-playlist.json",
            dataType: "json",
            cache: false,
            success: function(rsp) {
                var counter = 0;
                for (var idx in rsp.videos) {
                    var video = new LT.Model.YouTubeVideo(rsp.videos[idx].id);
                    video.setTitle(rsp.videos[idx].title);
                    video.setDescription(rsp.videos[idx].description);
                    self.addItem(video);
                }
                _();
            },
            error: function(err) {
                console.log(err.reason)
                console.log("[YouTubePlaylist] error", err);
                _();
            }
        });
    }


    /**
    * Finds the YouTube Video URL within a URL
    *
    * @return {string} A YouTube Video ID
    */
    LT.Model.YouTubePlaylist.prototype.getVideoId = function(url) {
        var qs = LT.Util.queryString(url);
        if (qs.v) return qs.v;
    }


}).call(this);