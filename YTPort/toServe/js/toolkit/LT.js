/* 
* LAB TOOLKIT
*
* a common set of utility functions and basic setup universal to all projects
*
*/


(function() {
    var LT = namespace("com.rockwellgroup.lab.toolkit");

    LT.Model = LT.Model || {};
    LT.View = LT.View || {
        CID: 0 // can be used to create unique element ids
    };
    LT.UI = LT.UI || {};
    LT.Controller = LT.Controller || {};
    LT.Network = LT.Network || {};

    // Rockwell LAB
    LT.Util = {
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
        // retrieves a parameter specific to a url
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

    // override console.log
    /* */
    var log_fn = console.log;
    console.log = function() {
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

var LOG_ERROR = 1;
var LOG_INFO = 2;
var LOG_EVENTS = 3;
var LOG_NARRATE = 4;
var LOG_ALL = 5;

