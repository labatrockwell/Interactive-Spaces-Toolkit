(function() {

    var LT = namespace("com.rockwellgroup.lab.toolkit");

    
    //------------------------------------------------------------ Video Model
    LT.Model.Video = function(id) {
        this.title = ""; // title of video
        this.description = ""; // description for video
        this.id = id; // local or remote id for video
    }
        
    /**
    * Initialize video model
    *
    * @stub
    */
    LT.Model.Video.prototype.initialize = function(_) {
        _();
    }

    /**
    * Sets the video title
    *
    * @param {string} val The desired title of the video
    */
    LT.Model.Video.prototype.setTitle = function(val) {
        if (val) {
            this.title = val;            
        }
    };

    /**
    * Sets the video description
    *
    * @param {string} val The desired description for the video
    */
    LT.Model.Video.prototype.setDescription = function(val) {
        if (val) {
            this.description = val;            
        }
    };


    //--------------------------------------------------------- Playlist Model
    LT.Model.Playlist = function(id) {
        this.id = id; // local or remote id for playlist
        this.collection = [];
        this.index = 0;
    }

    LT.Model.Playlist.prototype = {
        
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
            console.log("[Playlist] add video", video)
            this.collection.push(video);
        },


        /** 
        * Focuses the playlist on the video with the matching ID
        *
        * @param {string} The video ID for one of the videos in the playlist
        */
        setItemIndex: function(video_id) {
            if (!video_id) {
                console.log("[Playlist] Video is invalid", video_id);
                return;
            }

            // @todo optimize search
            for (var idx in this.collection) {
                var item = this.collection[idx];
                if (item.id === video_id) {
                    this.index = idx;
                }
            }
            console.log("[Playlist] Updated active video to ", video_id, this.index, this.getItemActive());
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
    }

}).call(this);