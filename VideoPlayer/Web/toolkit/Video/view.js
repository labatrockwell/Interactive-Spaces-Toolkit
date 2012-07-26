(function() {
    var LT = namespace("com.rockwellgroup.lab.toolkit");
    
    //----------------------------------------------- Video Player Target View

    LT.View.VideoPlayerTarget = function($el) {
        this.$el = $el; // references an element in the DOM
    };

    /**
    * Initialize video view
    *
    * @stub
    */
    LT.View.VideoPlayerTarget.prototype.initialize = function(_) {
        _();
    };

}).call(this);