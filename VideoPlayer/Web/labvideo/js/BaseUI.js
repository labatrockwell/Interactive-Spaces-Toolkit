/** 
* @constructor
* @function
* @param	{controller} controller that will receive UI events.
*/
var BaseUI = function( controller ){
	this.controller = controller;
}

/** 
* @function
* @param	{id} url, video id or some other identifier.
*/
BaseUI.prototype.load = function( id ){
	this.controller.load(id);
}; 

BaseUI.prototype.start = function(){
	this.controller.start();
};

BaseUI.prototype.stop = function(){
	this.controller.stop();
};

BaseUI.prototype.pause = function(){
	this.controller.pause();
};