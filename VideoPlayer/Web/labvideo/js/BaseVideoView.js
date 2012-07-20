// Loop stuff
var LoopType = {
	LOOP_REPEAT:"loop_repeat",
	LOOP_BACK_AND_FORTH:"loop_back_and_forth"
}

var ScaleMode = {
	SCALE_NONE : "no_scale",
	SCALE_LETTERBOX : "scale_letterbox",
	SCALE_CROP : "scale_crop",
	SCALE_STRETCH : "scale_stretch"
}

// All functions to do with display
var BaseVideoView = function(){
	// what properties should this have?

	this.loopType = LoopType.LOOP_REPEAT;
	this.scaleMode = ScaleMode.SCALE_LETTERBOX;
	this.width = 0;
	this.height = 0;
}

/** 
* @function
* @param {DOMElement} parentElement
*/
BaseVideoView.prototype.setup = function( parent ){};

// called by Controller
/** 
* @function
* @param {String} url
* @returns {Boolean} Success (or not)
*/
BaseVideoView.prototype.load = function( url ){};

/** 
* @function
* @returns {Boolean} Success?
*/
BaseVideoView.prototype.start = function(){};

/** 
* Stop + Seek to 0
* @function
*/
BaseVideoView.prototype.stop = function(){};

/** 
* @function
*/
BaseVideoView.prototype.pause = function(){};

/** 
* @function
*/
BaseVideoView.prototype.unload = function(){}

/** 
* @function
* @param	{Float} where (0-1)
*/
BaseVideoView.prototype.seek = function( where ){}; //0-1

// Cropping / skewing / rotation

/** 
* @function
* @param	{Integer} width
* @param	{Integer} height
*/
BaseVideoView.prototype.setDimensions = function( width, height ){
	this.width = width;
	this.height = height;
};

/** 
* @function
* @returns	{Object} {width, height}
*/
BaseVideoView.prototype.getDimensions = function(){};

/** 
* @function
* @param	{ScaleMode} mode
*/
BaseVideoView.prototype.setScaleMode = function( mode ){};

/** 
* @function
* @returns	{ScaleMode}
*/
BaseVideoView.prototype.getScaleMode = function(){};

/** 
* @function
* @param	{Integer} degrees
*/
BaseVideoView.prototype.setRotation = function( degrees ){};

// GUI -> Controller -> View
/** 
* @function
*/
BaseVideoView.prototype.goFullscreen 	 = function(){};

/** 
* @function
*/
BaseVideoView.prototype.leaveFullscreen	 = function(){};

/** 
* @function
*/
BaseVideoView.prototype.toggleFullscreen = function(){};

/** 
* @function
* @param	{Float} level (0-1)
*/
BaseVideoView.prototype.setVolume 		= function( level ){}; //0-1

// Metadata
/** 
* @function
* @param 	{BaseMetaData }	metadata
*/
BaseVideoView.prototype.setMetadata = function( metadata){}

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
/** 
* @function
* @returns 	{Array}	Array of BaseVideoEffect(s)
*/
BaseVideoView.prototype.getEffects 	= function(){};

/** 
* @function
* @param 	{Float}	speed -5 to 5 ? (range tbd)
*/
BaseVideoView.prototype.setSpeed 	= function( speed ){};

/** 
* @function
* @param 	{BaseVideoEffect}	effect
*/
BaseVideoView.prototype.addEffect 	= function( effect ){};

/** 
* @function
* @param 	{BaseVideoEffect}	effect
*/
BaseVideoView.prototype.removeEffect = function( effect ){};

// Getters

/** 
* @function
* @returns 	{BaseVideoStae}
*/
BaseVideoView.prototype.getState = function(){};

/** 
* @function
* @returns 	{Integer}
*/
BaseVideoView.prototype.getTime = function(){};