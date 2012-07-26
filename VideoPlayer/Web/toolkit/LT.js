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
        }
    }


}).call(this);

// http://elegantcode.com/2011/01/26/basic-javascript-part-8-namespaces/
function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';    

    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }

    return parent;
}