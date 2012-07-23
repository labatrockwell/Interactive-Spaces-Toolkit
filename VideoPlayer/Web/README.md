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


** Thoughts on: UI Model **
* Consider setting up UI model so that we have a UI controller that interprets events from a UI element and connects to the main/video/playlist controller. This would be useful for the following scenarios:
** When we have a external UI element, such as an IS app that sends UI events via routes. In this case the UI controller class would receive the UI messages via a route, interpret them and call the appropriate methods from the main/video/playlist controller.
** when we have a view that includes UI elements. In this case the UI controller would be linked to the view, and the view would pass on the UI events to this UI controller to be interpreted. The UI controller would call the appropriate methods from the main/video/playlist controller. 



