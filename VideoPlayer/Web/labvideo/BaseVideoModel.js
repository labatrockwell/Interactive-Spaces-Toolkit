
// Stores all Data
var BaseVideoModel = function(){
	// Standard Data
	this.URL 				= "";
	this.ID					= "";
	this.title				= "";
	this.description		= "";

	this.length				= 0;
	
	this.thumbnails			= []; // Array <Image> 
	this.closedCaptioning 	= {};
	this.location			= {lat:0, long:0};

	// Custom Data
	this.keyframes			= []; // Array <Image>? this is probably some other type of object
	this.customFields		= {};
}