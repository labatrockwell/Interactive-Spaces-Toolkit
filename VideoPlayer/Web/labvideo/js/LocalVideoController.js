//no idea why this is here,
//it was in Brett's e-mail.
//probably just so we start off with a declared object and don't get js errors?
var LocalVideoController = function(model, view){
	BaseVideoController.call(this, model, view);
	this.view.setup(document.body);
};

LocalVideoController.prototype = LAB.inherit(BaseVideoController.prototype);
LocalVideoController.prototype.constructor = LocalVideoController;
