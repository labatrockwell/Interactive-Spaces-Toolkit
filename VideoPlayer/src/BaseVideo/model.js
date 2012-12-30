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
            //LT.log(LOG_INFO, "[Playlist] + ", video);
            this.collection.push(video);
        },

        setItemIndex: function(video_id) {
            
            if (!video_id) {
                LT.log(LOG_ERROR, "[Playlist] Video is invalid", video_id);
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
            LT.log(LOG_NARRATE, "[Playlist] Updated active video to ", video_id, this.index, this.getItemActive());
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

}).call(this);