
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

	this.getTitle = function() {
		return this.getTitle;
	};

	this.getDescription = function() {
		return this.description;
	};

	this.getLength = function() {
		return this.length;
	};

	this.getThumbnails = function() {
		return this.thumbnails;
	};

	this.getClosedCaptioning = function() {
		return this.closedCaptioning;
	};

	this.getLocation = function() {
		return this.location;
	};

	this.getKeyframes = function() {
		return this.keyframes;
	};

	this.getCustomFields = function() {
		return this.customFields;
	};



	// Setters
	this.setURL = function(val) {
		this.URL = val;
	};

	this.setID = function(val) {
		this.ID = val;
	};

	this.setTitle = function(val) {
		this.title = val;
	};

	this.setDescription = function(val) {
		this.description = val;
	};

	this.setLength = function(val) {
		this.length = val;
	};

	this.setThumbnails = function(val) {
		this.thumbnails = val;
	};

	this.setClosedCaptioning = function(val) {
		this.closedCaptioning = val;
	};

	this.setLocation = function(val) {
		this.location = val;
	};

	this.setKeyframes = function(val) {
		this.keyframes = val;
	};

	this.setCustomFields = function(val) {
		this.customFields = val;
	};

}