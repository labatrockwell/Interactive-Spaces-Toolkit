//no idea why this is here,
//it was in Brett's e-mail.
//probably just so we start off with a declared object and don't get js errors?
var LocalVideoController = function(model, view){
	BaseVideoController.call(this, model, view);
	this.view.setup(document.body);  // move to BaseVideoController
};

LocalVideoController.prototype = LAB.inherit(BaseVideoController.prototype);
LocalVideoController.prototype.constructor = LocalVideoController;

LocalVideoController.prototype.load = function(path) {
	this.view.load(path);
	this.view.play();
	this.view.setDimensions(window.innerWidth, window.innerHeight);
}