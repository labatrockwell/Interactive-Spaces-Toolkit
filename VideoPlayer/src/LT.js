/**
    Namespace
    
    http://elegantcode.com/2011/01/26/basic-javascript-part-8-namespaces/
*/ function namespace(namespaceString){var parts=namespaceString.split('.'),parent=window,currentPart='';for(var i=0,length=parts.length;i<length;i++){currentPart=parts[i];parent[currentPart]=parent[currentPart]||{};parent=parent[currentPart]}return parent};


(function() {
    var LT = namespace("com.rockwellgroup.lab.toolkit");

    /** 
        Lab Toolkit: A common set of utility functions and basic setup universal to all projects 
        @name LT
        @namespace LT
        @property {Object} Model
        @property {Object} Controller
        @property {Object} View
        @property {function} namespace("com.rockwellgroup.lab.toolkit")
        @property {Object} Util General group of utility functions
        @author <a href="mailto:jonah@paperequator.com">Jonah Model</a>
        @author <a href="mailto:eric@adaptedstudio.com">Eric Ishii Eckhardt</a>
    */

    LT.Model = LT.Model || {};
    LT.View = LT.View || {
        CID: 0 // can be used to create unique element ids
    };
    LT.UI = LT.UI || {};
    LT.Controller = LT.Controller || {};
    LT.Network = LT.Network || {};

    /**
        @memberOf LT
        @name LT.Util
        @namespace LT.Util
    */ 

    // Rockwell LAB
    LT.Util = {
        /**
            Creates inheretence for objects
            @function inherit
            @memberOf LT.Util
            @param {Object} p Must be non-null object, can't be a function
         */
        inherit: function(p) {
            if (p == null) return; // p must be a non-null object
            if (Object.create) { // If Object.create() is defined...
                return Object.create(p); // then just use it
            }
            var t = typeof p; // otherwise do some more type checking
            if (t !== "object" && t !== "function") throw TypeError();
            function f() {}; // define a dummy constructor function
            f.prototype = p; // Set its prototype property to p
            return new f(); // use f() to create an 'heir' of p.
        },
        
        /**
            Splits created variables from the querystring of a URL
            @function queryString
            @memberOf LT.Util
            @param {String} url
            @returns {Array} vars Every variable in an array of key value objects
        */ 
        queryString: function (url) {

            var vars = [], hash;
            var hashes = url.slice(url.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },

        /**
            Callback for script loader
            @function loadScript
            @memberOf LT.Util
            @deprecated We should probably use HeadJS or requireJS's loaded callbacks
            @param {String} _src
            @param {String} _callback
            @returns {Array} _callback Callback function, same as param
        */ 
        loadScript: function(_src, _callback) {
            var script;
            script = document.createElement('script');
            script.onload = function() {
              if (typeof _callback === "function") return _callback();
            };
            script.src = _src;
            return document.getElementsByTagName('head')[0].appendChild(script);
        }
    };

    /**
        In lieu of standard console.log
        @class LT.log
        @param {int} debug_level Options [LOG_ERROR, LOG_INFO, LOG_EVENTS, LOG_NARRATE, LOG_ALL]
        @param {String} _callback
        @returns {Array} _callback Callback function, same as param
    */ 
    var log_fn = LT.log;
    LT.log = function() {
        var debug_level = LT.Util.queryString(window.location.search).debug || 1;

        var args = Array.prototype.slice.call(arguments);
        if (typeof(args[0]) == "number") {
            if (debug_level && args[0] <= debug_level) {
                args = args.slice(1, args.length);
                log_fn.apply(this, args); 
            }
        }
        else {
            log_fn.apply(this, args);            
        }
    }


}).call(this);


/** 
    Options for Log Level are set via querystring: 1-5
    or in code: LOG_ERROR, LOG_INFO, LOG_EVENTS, LOG_NARRATE, LOG_ALL
*/
var LOG_ERROR = 1;
var LOG_INFO = 2;
var LOG_EVENTS = 3;
var LOG_NARRATE = 4;
var LOG_ALL = 5;

