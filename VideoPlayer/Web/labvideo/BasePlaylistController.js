// Extends BaseVideoController
/** 
* @constructor
*/
var BasePlaylistController = function(){
	//Array <BaseVideoModel> 
	this.videos = [];
}

/**
* @function
* @param 	{Array} BaseVideoModels
*/
BasePlaylistController.prototype.load = function ( BaseVideoModels ){
	return true;
}

BasePlaylistController.prototype.unload();
BasePlaylistController.prototype.previous();
BasePlaylistController.prototype.next();

BasePlaylistController.prototype.queueNext( bool bPlayWhenReady );
BasePlaylistController.prototype.queuePrevious( bool bPlayWhenReady  );

BasePlaylistController.prototype.setLoop( bool doLoop );
BasePlaylistController.prototype.setLoopType( LoopType type );

//BaseVideoModel 
BasePlaylistController.prototype.getRandomVideo = function(){};
BasePlaylistController.prototype.getVideo = function( int which ){};

BasePlaylistController.prototype.getCurrentVideo = function(){};
BasePlaylistController.prototype.getNextVideo = function(){};
BasePlaylistController.prototype.getPreviousVideo = function(){};

BasePlaylistController.prototype.getNumVideos = function(){};

// transitions: override video-level?
BasePlaylistController.prototype.setTransition = function( inOut ){};
BasePlaylistController.prototype.setTransitions = function( in, out ){};