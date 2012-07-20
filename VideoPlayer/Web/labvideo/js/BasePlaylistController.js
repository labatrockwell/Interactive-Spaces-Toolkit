// Extends BaseVideoController
/** 
* @constructor
*/
var BasePlaylistController = function(){
	//Array <BaseVideoModel> 
	this.videos = [];
};

/**
* @function
* @param 	{Array} BaseVideoModels
*/
BasePlaylistController.prototype.load = function ( BaseVideoModels ){
	return true;
};

BasePlaylistController.prototype.unload = function(){};
BasePlaylistController.prototype.previous = function(){};
BasePlaylistController.prototype.next =  function(){};

BasePlaylistController.prototype.queueNext = function( bPlayWhenReady ){};
BasePlaylistController.prototype.queuePrevious = function( bPlayWhenReady  ){};

BasePlaylistController.prototype.setLoop = function( bDoLoop ){};
BasePlaylistController.prototype.setLoopType = function( eLoopType ){};

//BaseVideoModel 
BasePlaylistController.prototype.getRandomVideo = function(){};
BasePlaylistController.prototype.getVideo = function( nWhich ){};

BasePlaylistController.prototype.getCurrentVideo = function(){};
BasePlaylistController.prototype.getNextVideo = function(){};
BasePlaylistController.prototype.getPreviousVideo = function(){};

BasePlaylistController.prototype.getNumVideos = function(){};

// transitions: override video-level?
BasePlaylistController.prototype.setTransition = function( tInOut ){};
BasePlaylistController.prototype.setTransitions = function( tIn, tOut ){};