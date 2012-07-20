// Loop stuff
var LoopType = {
	LOOP_REPEAT:"loop_repeat",
	LOOP_BACK_AND_FORTH:"loop_back_and_forth";
};

// All functions to do with display
var BaseVideoView = function(){
	// what properties should this have?
}

// called by Controller
BaseVideoView.prototype.start = function(){};
BaseVideoView.prototype.stop = function(){};
BaseVideoView.prototype.pause = function(){};

BaseVideoView.prototype.load = function( url ){
	return true;
}

BaseVideoView.prototype.unload = function(){
	return true;
}

BaseVideoView.prototype.seek = function( where ){}; //0-1

// GUI -> Controller -> View
BaseVideoView.prototype.goFullscreen 	= function(){};
BaseVideoView.prototype.setVolume 		= function( level ){}; //0-1

// Metadata
/** 
* @function
* @param 	{BaseMetaData }	metadata
*/

BaseVideoView.prototype.setMetadata = function( metadata){
}

/** 
* @function
* @param 	{String}	title
*/
BaseVideoView.prototype.setTitle = function( title){};

/** 
* @function
* @param 	{String}	description
*/
BaseVideoView.prototype.setDescription = function( description ){};

/** 
* @function
* @param 	{Image}	thumb
*/
BaseVideoView.prototype.addThumbnail = function( thumb ){};

// Effects
BaseVideoView.prototype.getEffects 	= function(){};
BaseVideoView.prototype.setSpeed 	= function( speed ){};
BaseVideoView.prototype.addEffect 	= function( effect ){};
BaseVideoView.prototype.removeEffect = function( effect ){};

// Getters
BaseVideoView.prototype.getState = function(){};
BaseVideoView.prototype.getTime = function(){};