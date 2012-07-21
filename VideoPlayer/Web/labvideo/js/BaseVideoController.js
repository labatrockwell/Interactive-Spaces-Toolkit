// Gets Data and Sends it to the Display
/** 
* @constructor
* @param	{BaseVideoModel} model
* @param	{BaseVideoView} view
*/

var BaseVideoController = function( model, view ){
	this.model = model;
	this.view = view; //BaseVideoView
};

/** 
* maybe this is the same as load?
* @function
* @param		{BaseVideoModel} model
*/
BaseVideoController.prototype.setModel = function( model ){
	this.model = model;
	this.view.load(this.model);
};

//BaseVideoModel 
BaseVideoController.prototype.getMetadata = function(){};

/** 
* @function
* @param		{Boolean} doLoop
*/
BaseVideoController.prototype.setLoop = function( doLoop ){};

/** 
* @function
* @param		{LoopType} type
*/
BaseVideoController.prototype.setLoopType = function( type ){};


/** 
* this is probably a virtual function with an abstract type instead of URL...
* @function
* @param		{String} url
*/
BaseVideoController.prototype.load = function( url ){
	if (url){
		this.model.setURL(url);
	}
	this.view.load(this.model.getURL());
}; 

BaseVideoController.prototype.unload = function(){
	this.view.unload();
};

BaseVideoController.prototype.play = function(){
	this.view.play();
};

BaseVideoController.prototype.stop = function(){
	this.view.stop();
};

BaseVideoController.prototype.pause = function(){
	this.view.pause();
};

BaseVideoController.prototype.seek = function( where ){
	this.view.seek( where );
};

/** 
* @function
* @param		{BaseVideoModel} model
*/
BaseVideoController.prototype.setMetadata = function(){
	//this.view.setMetadata();
};

// Called by GUI
BaseVideoController.prototype.goFullscreen = function(){
	this.view.goFullscreen();
};

BaseVideoController.prototype.setVolume = function( level ){
	this.view.setVolume( level );
};