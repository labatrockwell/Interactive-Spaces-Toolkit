(function() {
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