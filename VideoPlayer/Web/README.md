Interactive-Spaces-Toolkit
==========================

Repository that holds tools created for prototyping and building interactive spaces.


** How to run the examples ** 
1. From the terminal navigate to the current directory (where this readme file is saved)
2. Run python command "python -m SimpleHTTPServer" to start up a webserver from current directory. 
3. Open a browser and go to http://localhost:8000/examples 
4. Then select the example that you want to view from the list of links


** Refactor Items for Discussion **
* Review code for views to determine what elements should be abstracted further
* Review code for controller to determine what elements should be abstracted further
* Agree on approach for inheritance to use throughout entire library
* Agree on standard approach for structuring the prototype definitions in our code
	option 1: 
		RemoteVideoView = function () {}
		RemoteVideoView.prototype = {
			constructor: RemoteVideoView,
			setup:function(_target, _params){};
		}

	options 2: 
		var LocalVideoView = function(){
			BaseVideoView.call(this);
		}
		LocalVideoView.prototype = LAB.inherit( BaseVideoView.prototype );
		LocalVideoView.prototype.constructor = LocalVideoView;
* Agree on when we should use var

