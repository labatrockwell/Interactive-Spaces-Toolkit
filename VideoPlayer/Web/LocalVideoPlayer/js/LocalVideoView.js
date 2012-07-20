/**
* @constructor
*/
var LocalVideoView = function(){
	BaseVideoView.call(this);

	this.domElement 	= null;
	this.videoElement 	= null;
}

LocalVideoView.prototype = LAB.inherit( BaseVideoView.prototype );
LocalVideoView.prototype.constructor = LocalVideoView;

/** 
* @function
* @param {DOMElement} parentElement
*/
LocalVideoView.prototype.setup = function( parentElement ){
	// initialize DOM objects
	this.domElement   = document.createElement("div");
	this.videoElement = document.createElement("video");
	this.domElement.appendChild(this.videoElement);

	// setup style props of dom element
	this.domElement.style.position = "static";
	this.domElement.style.overflow = "hidden";
	this.domElement.style.backgroundColor = "black";
	this.videoElement.style.position = "absolute";
	this.videoElement.style["-webkit-transform-origin"] = "0 0";

	// add event listeners

	this.videoElement.addEventListener("loadeddata", function(){
		this.setScaleMode( this.scaleMode );
	}.bind(this));

	// append to parent
	if ( parentElement != undefined ){
		parentElement.appendChild(this.domElement);
	}
}

/** 
* @returns {HTMLDivElement} returns mask element
*/
LocalVideoView.prototype.getDomElement = function(){
	return this.domElement;
};

/** 
* @returns {HTMLVideoElement} returns <video> videoElement
*/
LocalVideoView.prototype.getVideoElement = function(){
	return this.videoElement;
};

/** 
* @function
*/
LocalVideoView.prototype.start = function(){
	if ( this.videoElement ){
		this.videoElement.play();		
	}
};

/** 
* Stop + rewind.
* @function
*/
LocalVideoView.prototype.stop = function(){
	if ( this.videoElement ){
		this.videoElement.pause();	
		this.seek(0);
	}
};

/** 
* @function
*/
LocalVideoView.prototype.pause = function(){
	if ( this.videoElement ){
		if ( this.videoElement.paused ){
			this.start();
		} else {
			this.videoElement.pause();	
		}
	}
};

/** 
* @function
* @param {String} url
* @returns {Boolean} Success (or not)
*/
LocalVideoView.prototype.load = function( url ){
	if ( this.videoElement ){
		if ( this.videoElement.src != "" ) this.unload();
		this.videoElement.src = url;
		try {
			this.videoElement.load();
			return true;	
		} catch(e){
			console.warn(this.videoElement.error.code);
			return false;
		}
	}
}

/** 
* @function
*/
LocalVideoView.prototype.unload = function(){
	this.videoElement.src = "";
	this.videoElement.load();	
	return true;
}

/** 
* @function
* @param	{Float} where (0-1)
*/
LocalVideoView.prototype.seek = function( where ){
	if ( this.videoElement ){
		// NOTE: SHOULD DURATION BE FROM THE MODEL?
		this.videoElement.currentTime = this.videoElement.duration * where;
	}
};

/** 
* @function
* @param	{Integer} width
* @param	{Integer} height
*/
LocalVideoView.prototype.setDimensions = function( width, height ){
	this.width = width;
	this.height = height;

	// turn off 'static' property
	this.domElement.style.position = "absolute";

	this.domElement.style.width = this.width + "px";
	this.domElement.style.height = this.height + "px";	
	
	// reset scale stuff
	this.setScaleMode( this.scaleMode );	
};

/** 
* @function
* @param	{ScaleMode} mode
*/
LocalVideoView.prototype.setScaleMode = function( mode ){
	this.scaleMode = mode;

	if ( this.width == 0 && this.height == 0){
		console.warn("scale mode is not set if there is not a set width + height")
		return;
	}
	//if ( this.videoElement.videoWidth == 0 || this.videoElement.videoHeight == 0) return;

	switch ( this.scaleMode){
		case ScaleMode.SCALE_LETTERBOX:
			this.videoElement.style["-webkit-transform"] = "scaleX(1) scaleY(1)";
			if ( this.videoElement.videoWidth > this.width ){
				if ( this.videoElement.videoWidth > this.videoElement.videoHeight ){
					var scale = this.width / this.videoElement.videoWidth;
					this.videoElement.width = this.width;
					this.videoElement.height = this.videoElement.videoHeight * scale;
					var pos   = ( this.height - this.videoElement.height ) / 2;
					this.videoElement.style.left = "0px";
					this.videoElement.style.top = pos + "px";
				} else {				
					var scale = this.height / this.videoElement.videoHeight;
					this.videoElement.width = this.videoElement.videoWidth * scale ;
					this.videoElement.height = this.height;
					var pos   = ( this.width - this.videoElement.width ) / 2;
					this.videoElement.style.left = pos + "px";
					this.videoElement.style.top = "0px";
				}
			} else {			
				if ( this.videoElement.videoWidth < this.videoElement.videoHeight ){
					var scale = this.width / this.videoElement.videoWidth;
					this.videoElement.width = this.width;
					this.videoElement.height = this.videoElement.videoHeight * scale;
					var pos   = ( this.height - this.videoElement.height) / 2;
					this.videoElement.style.left = "0px";
					this.videoElement.style.top = pos + "px";
				} else {				
					var scale = this.height / this.videoElement.videoHeight;
					this.videoElement.width = this.videoElement.videoWidth * scale ;
					this.videoElement.height = this.height;
					var pos   = ( this.width - this.videoElement.width ) / 2;
					this.videoElement.style.left = pos + "px";
					this.videoElement.style.top = "0px";
				}
			}

			break;
		case ScaleMode.SCALE_CROP:
			this.videoElement.style["-webkit-transform"] = "scaleX(1) scaleY(1)";
			if ( this.videoElement.videoWidth > this.width ){
				if ( this.videoElement.videoWidth < this.videoElement.videoHeight ){
					var scale = this.width / this.videoElement.videoWidth;
					this.videoElement.width = this.width;
					this.videoElement.height = this.videoElement.videoHeight * scale;
					var pos   = ( this.height - this.videoElement.height ) / 2;
					this.videoElement.style.left = "0px";
					this.videoElement.style.top = pos + "px";
				} else {				
					var scale = this.height / this.videoElement.videoHeight;
					this.videoElement.width = this.videoElement.videoWidth * scale ;
					this.videoElement.height = this.height;
					var pos   = ( this.width - this.videoElement.width ) / 2;
					this.videoElement.style.left = pos + "px";
					this.videoElement.style.top = "0px";
				}
			} else {			
				if ( this.videoElement.videoWidth > this.videoElement.videoHeight ){
					var scale = this.width / this.videoElement.videoWidth;
					this.videoElement.width = this.width;
					this.videoElement.height = this.videoElement.videoHeight * scale;
					var pos   = ( this.height - this.videoElement.height) / 2;
					this.videoElement.style.left = "0px";
					this.videoElement.style.top = pos + "px";
				} else {				
					var scale = this.height / this.videoElement.videoHeight;
					this.videoElement.width = this.videoElement.videoWidth * scale ;
					this.videoElement.height = this.height;
					var pos   = ( this.width - this.videoElement.width ) / 2;
					this.videoElement.style.left = pos + "px";
					this.videoElement.style.top = "0px";
				}
			}
			break;
		case ScaleMode.SCALE_STRETCH:
			this.videoElement.width 		= this.videoElement.videoWidth;
			this.videoElement.height 		= this.videoElement.videoHeight;
			var scaleX = this.width / this.videoElement.width;
			var scaleY = this.height / this.videoElement.height;
			this.videoElement.style["-webkit-transform"] = "scaleX("+scaleX+") scaleY("+scaleY+")";
			this.videoElement.style.left 	= "0px";
			this.videoElement.style.top		= "0px";
			break;

		case ScaleMode.SCALE_NONE:
			this.videoElement.style["-webkit-transform"] = "scaleX(1) scaleY(1)";
			this.videoElement.width 		= this.videoElement.videoWidth;
			this.videoElement.height 		= this.videoElement.videoHeight;
			this.videoElement.style.left 	= "0px";
			this.videoElement.style.top		= "0px";
			break;
	}
};

/** 
* @function
*/
LocalVideoView.prototype.goFullscreen 	= function(){
	if ( this.videoElement.webkitRequestFullScreen ){
		this.videoElement.webkitRequestFullScreen();
	} else if ( this.videoElement.mozRequestFullScreen ){
		this.videoElement.webkitRequestFullScreen();
	} else if ( this.videoElement.requestFullScreen ){
		this.videoElement.requestFullScreen();		
	} else {
		console.log("no fullscreen 4 u")
	}
};

/** 
* @function
* @param	{Float} level (0-1)
*/
LocalVideoView.prototype.setVolume 		= function( level ){
	if ( this.videoElement ){
		this.videoElement.volume = level;
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