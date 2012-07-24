var LAB = LAB || {};
var included = included || {};

// for now:
// var labvideo = {};
// labvideo.src = "path/to/where" e.g. js/labvideo/
var labvideo = labvideo || {};

// set path for labvideo files to same path as examples folder 
var path = document.location.pathname;
var dir = path.substr(0, path.indexOf('/implementations'));
labvideo.src = dir + "/labvideo/js/";

// Include necessary LAB functions for now
// Includes are at the bottom of the file

LAB.inherit = function(p) {
	if (p == null) return; // p must be a non-null object
	if (Object.create) { // If Object.create() is defined...
		return Object.create(p); // then just use it
	}
	var t = typeof p; // otherwise do some more type checking
	if (t !== "object" && t !== "function") throw TypeError();
	function f() {}; // define a dummy constructor function
	f.prototype = p; // Set its prototype property to p
	return new f(); // use f() to create an 'heir' of p.
};

/**
@function
@private
*/
LAB.writeScriptTag_ = function(src) {
	var doc = document;
	console.log("writeScriptTag_: " + src);
	doc.write(
		'<script type="text/javascript" src="' + src + '"></' + 'script>');
	included[src] = true;
	return true;
};

/**
	Use this to load script files! (only script files right now)
	@function
	@public
*/
LAB.require = function(src) {
	console.log("require: " + src);
	src in included ? console.log("already included") : LAB.writeScriptTag_(src);
};

/**
	Use this to load script files! (only script files right now)
	@function
	@public
*/
LAB.require = function(src) {
	console.log("require: " + src);
	src in included ? console.log("already included") : LAB.writeScriptTag_(src);
};

LAB.getScriptPath = function(filename) {
	var scripts = document.getElementsByTagName('script');

    for (var i = scripts.length - 1; i >= 0; --i) {
		var src = scripts[i].src;
		var l = src.length;
		var length = filename.length;
		if (src.substr(l - length) == filename) {
        	// set a global propery here
        	return src.substr(0, l - length);
		}
    }
	return "";
};

// import base models
LAB.require(labvideo.src+"Events.js");
LAB.require(labvideo.src+"BaseVideoModel.js");
LAB.require(labvideo.src+"BaseVideoView.js");
LAB.require(labvideo.src+"BaseVideoController.js");
LAB.require(labvideo.src+"BasePlaylistController.js");
LAB.require(labvideo.src+"BaseUI.js");


