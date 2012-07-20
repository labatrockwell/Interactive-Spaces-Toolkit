/**
* @constructor
*/
var LocalVideoView = function(){
	BaseVideoView.call(this);

	this.domElement = null;
}

LocalVideoView.prototype = LAB.inherit( BaseVideoView.prototype );
LocalVideoView.prototype.constructor = LocalVideoView;

/** 
* @function
* @param {DOMElement} parentElement
*/
LocalVideoView.prototype.setup = function( parentElement ){
	// initialize DOM object
	this.domElement = document.createElement("video");

	if ( parentElement != undefined ){
		parentElement.appendChild(this.domElement);
	}
}

/** 
* @returns {HTMLVideoElement} returns <video> DOMElement
*/
LocalVideoView.prototype.getDomElement = function(){
	return this.domElement;
};

/** 
* @function
*/
LocalVideoView.prototype.start = function(){
	if ( this.domElement ){
		this.domElement.play();		
	}
};

/** 
* Stop + rewind.
* @function
*/
LocalVideoView.prototype.stop = function(){
	if ( this.domElement ){
		this.domElement.pause();	
		this.seek(0);
	}
};

/** 
* @function
*/
LocalVideoView.prototype.pause = function(){
	if ( this.domElement ){
		if ( this.domElement.paused ){
			this.start();
		} else {
			this.domElement.pause();	
		}
	}
};

/** 
* @function
* @param {String} url
* @returns {Boolean} Success (or not)
*/
LocalVideoView.prototype.load = function( url ){
	if ( this.domElement ){
		if ( this.domElement.src != "" ) this.unload();
		this.domElement.src = url;
		try {
			this.domElement.load();	
			return true;	
		} catch(e){
			console.warn(this.domElement.error.code);
			return false;
		}
	}
}

/** 
* @function
*/
LocalVideoView.prototype.unload = function(){
	this.domElement.src = "";
	this.domElement.load();	
	return true;
}

/** 
* @function
* @param	{Float} where (0-1)
*/
LocalVideoView.prototype.seek = function( where ){
	if ( this.domElement ){
		// NOTE: SHOULD DURATION BE FROM THE MODEL?
		this.domElement.currentTime = this.domElement.duration * where;
	}
};
/** 
* @function
*/
LocalVideoView.prototype.goFullscreen 	= function(){
	
};

/** 
* @function
* @param	{Float} level (0-1)
*/
LocalVideoView.prototype.setVolume 		= function( level ){
	if ( this.domElement ){
		this.domElement.volume = level;
	}
};

// Metadata will probably all be implemented in the base class?

// Effects
LocalVideoView.prototype.getEffects 	= function(){};
LocalVideoView.prototype.setSpeed 	= function( speed ){};
LocalVideoView.prototype.addEffect 	= function( effect ){};
LocalVideoView.prototype.removeEffect = function( effect ){};

// Getters
LocalVideoView.prototype.getState = function(){};
LocalVideoView.prototype.getTime = function(){};