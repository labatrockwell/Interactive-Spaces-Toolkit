
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


	// Getters
	this.getURL = function() {
		return this.URL;
	};

	this.getID = funciton() {
		return this.ID;
	};

	this.getTitle = funciton() {
		return this.getTitle;
	};

	this.getDescription = funciton() {
		return this.description;
	};

	this.getLength = funciton() {
		return this.length;
	};

	this.getThumbnails = funciton() {
		return this.thumbnails;
	};

	this.getClosedCaptioning = funciton() {
		return this.closedCaptioning;
	};

	this.getLocation = funciton() {
		return this.location;
	};

	this.getKeyframes = funciton() {
		return this.keyframes;
	};

	this.getCustomFields = funciton() {
		return this.customFields;
	};



	// Setters
	this.setURL = function(val) {
		this.URL = val;
	};

	this.setID = funciton(val) {
		this.ID = val;
	};

	this.setTitle = funciton(val) {
		this.title = val;
	};

	this.setDescription = funciton(val) {
		this.description = val;
	};

	this.setLength = funciton(val) {
		this.length = val;
	};

	this.setThumbnails = funciton(val) {
		this.thumbnails = val;
	};

	this.setClosedCaptioning = funciton(val) {
		this.closedCaptioning = val;
	};

	this.setLocation = funciton(val) {
		this.location = val;
	};

	this.setKeyframes = funciton(val) {
		this.keyframes = val;
	};

	this.setCustomFields = funciton(val) {
		this.customFields = val;
	};

}