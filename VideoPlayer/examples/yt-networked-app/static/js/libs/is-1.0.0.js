// BIND FIX FOR OLDER BROWSERS
if( Function.prototype.bind ) {
} else {
	/** safari, why you no bind!? */
	Function.prototype.bind = function (bind) {
		var self = this;
		return function () {
			var args = Array.prototype.slice.call(arguments);
			return self.apply(bind || null, args);
		};
	};
}

/**
 * @namespace ISjs
 * @brief An javascript library to connect to IS installation.
 * <br />Copyright (C) 2012 LAB at Rockwell Group http://lab.rockwellgroup.com
 *
 * @author      The Lab
 * @modified    06/02/2012
 * @version     1.0.0
 */

var ISjs = {}

/** 
* @constructor
* @brief Creates a new IS connection with host
*/

ISjs.Connection = function( framework ){
	this.bConnected	 = false
	this.framework = framework || ISjs.INTERACTIVE_SPACES;

	this.onConnectHooks		= [];
	this.onDisconnectHooks	= [];
	this.onMessageHooks		= [];
	this.onStartupHooks		= [];
	this.onActivateHooks	= [];
	this.onDeactivateHooks	= [];
	this.onShutdownHooks	= [];
};


/** @function
 * @brief Setup IS connection
 * @param host 	{String} (optional) The I.S. backend that this application should connect to. Defaults to window.location.hostname. You must specify a host if you are connecting to a remote I.S. server.
 * @param port 	{Integer} (optional) The port on the host of the I.S. activity that this application should connect to. Defaults to window.location.port. You must specify a port if you change the port your local or remote I.S. server is running on.
 * @param channel {String} (optional) The websocket channel that this application should use to connect to the host. Defalut to "/websocket"
 * 
 */

ISjs.Connection.prototype.connect = function( host, port, channel ) {
	this.host 		= host || window.location.hostname;
	this.port 		= port || window.location.port;
	this.channel	= channel || "/websocket";

	this.socket 			= new WebSocket("ws://"+this.host+":"+this.port+this.channel);
	this.socket._parent		= this;
	this.socket.onmessage 	= this.onWSMessage.bind(this);
	this.socket.onopen 		= this.onConnectionOpened.bind(this);
	this.socket.onclose 	= this.onConnectionClosed.bind(this);
};

/**
 * @function
 * @brief Send an IS message
 * @param key {String} The name of the route you are sending.
 * @param value {Object} the value you are sending
*/
ISjs.Connection.prototype.sendMessage = function( route, value ) {
	//console.log("[IS] SendMessage", route, value)
	if (!this.bConnected){
		if (console) console.warn("Not connected!");
		return;
	}

	value['route'] = route;
	this.socket.send( JSON.stringify(value) );
};

/**
 * @function
 * @brief Pass in a function to receive messages from IS
 * @param fun {Function}  function you would like to be called; must catch (key, value)
*/

ISjs.Connection.prototype.onMessage = function( fun ) {
	if ( typeof fun !== "function" ){
		console.warn( "method passed to ISjs.Connection.onMessage is not a function");
	} else {
		// DEV NOTE: SHOULD WE CHECK FOR DUPLICATES?
		this.onMessageHooks.push( fun );
	}
};

/**
 * @function
 * @brief Pass in a function in your add a listener to "connect" events from IS.
 * @param fun {Function}  function you would like to be called
*/

ISjs.Connection.prototype.onConnect = function( fun ) {
	if ( typeof fun !== "function" ){
		console.warn( "method passed to ISjs.Connection.onConnect is not a function");
	} else {
		// DEV NOTE: SHOULD WE CHECK FOR DUPLICATES?
		this.onConnectHooks.push( fun );
		console.log("[IS]",this.onConnectHooks);
	}
};

/**
 * @function
 * @brief Pass in a function in your add a listener to "disconnect" events
 * @param fun {Function}  function you would like to be called
*/

ISjs.Connection.prototype.onDisconnect = function( fun ) {
	if ( typeof fun !== "function" ){
		console.warn( "method passed to ISjs.Connection.onDisconnect is not a function");
	} else {
		// DEV NOTE: SHOULD WE CHECK FOR DUPLICATES?
		this.onDisconnectHooks.push( fun );
	}
};

/**
 * @function
 * @brief Pass in a function in your add a listener to "startup" events from Interactive Spaces.
 * @param fun {Function}  function you would like to be called
*/

ISjs.Connection.prototype.onStartup = function( fun ) {
	if ( typeof fun !== "function" ){
		console.warn( "method passed to ISjs.Connection.onStartup is not a function");
	} else {
		// DEV NOTE: SHOULD WE CHECK FOR DUPLICATES?
		this.onStartupHooks.push( fun );
	}
};

/**
 * @function
 * @brief Pass in a function in your add a listener to "activate" events from Interactive Spaces.
 * @param fun {Function}  function you would like to be called
*/

ISjs.Connection.prototype.onActivate = function( fun ) {
	if ( typeof fun !== "function" ){
		console.warn( "method passed to ISjs.Connection.onActivate is not a function");
	} else {
		// DEV NOTE: SHOULD WE CHECK FOR DUPLICATES?
		this.onActivateHooks.push( fun );
	}
};

/**
 * @function
 * @brief Pass in a function in your add a listener to "deactivate" events from Interactive Spaces.
 * @param fun {Function}  function you would like to be called
*/

ISjs.Connection.prototype.onDeactivate = function( fun ) {
	if ( typeof fun !== "function" ){
		console.warn( "method passed to ISjs.Connection.onDeactivate is not a function");
	} else {
		// DEV NOTE: SHOULD WE CHECK FOR DUPLICATES?
		this.onDeactivateHooks.push( fun );
	}
};

/**
 * @function
 * @brief Pass in a function in your add a listener to "shutdown" events from Interactive Spaces.
 * @param fun {Function}  function you would like to be called
*/

ISjs.Connection.prototype.onShutdown = function( fun ) {
	if ( typeof fun !== "function" ){
		console.warn( "method passed to ISjs.Connection.onShutdown is not a function");
	} else {
		// DEV NOTE: SHOULD WE CHECK FOR DUPLICATES?
		this.onShutdownHooks.push( fun );
	}
};

/**
* @function
* @private
*/
ISjs.Connection.prototype.onConnectionOpened = function() {
	this.bConnected = true;
	if (console) console.log("[IS] Connected");

	//pass 'this' along in case connection is delegated by a separate class
	this.callAllFuncInArray(this.onConnectHooks, this);
};

/**
* @function
* @private
*/
ISjs.Connection.prototype.onConnectionClosed = function() {
	this.bConnected = false;
	this.callAllFuncInArray(this.onDisconnectHooks);
};

/**
* @function
* @brief A utility function to call every function in an array of functions without any arguments
* @private
*/
ISjs.Connection.prototype.callAllFuncInArray = function(array, arg){
	for(var i in array){
		//see ISjs.Connection.onConnectionOpened
		array[i](arg);
	};
};

/**
* @function
* @private
*/
ISjs.Connection.prototype.onWSMessage = function( evt ) {
	if (this.framework == ISjs.INTERACTIVE_SPACES){
		var dataObj = JSON.parse( evt.data );
		if (dataObj.route == "state"){
			switch (dataObj.data.state){
				case "startup":
					this.callAllFuncInArray(this.onStartupHooks);
					break;
				case "activate":
					this.callAllFuncInArray(this.onActivateHooks);
					break;
				case "deactivate":
					this.callAllFuncInArray(this.onDeactivateHooks);
					break;
				case "shutdown":
					this.callAllFuncInArray(this.onShutdownHooks);
					break;
				default:
					console.warn( "state passed via websocket is unexpected:");
					console.warn(dataObj);
					break;
			}
		} else {
			this.defaultMessageHandling(evt);	
		}
	} else {
		this.defaultMessageHandling(evt);
	}
};

/**
* @function
* @brief Handles the default functionality for onWSMessage
* @private
*/
ISjs.Connection.prototype.defaultMessageHandling = function(evt){
	var dataObj = JSON.parse( evt.data );
	if ( dataObj.route ) {
		for (var i=0; i<this.onMessageHooks.length; i++){
			this.onMessageHooks[i](dataObj.route, dataObj.data);
		};
	} else {
		for (var i=0; i<this.onMessageHooks.length; i++){
			this.onMessageHooks[i]( "route", dataObj );
		};
	}
}

/** @constant */
ISjs.INTERACTIVE_SPACES = "interactiveSpaces";