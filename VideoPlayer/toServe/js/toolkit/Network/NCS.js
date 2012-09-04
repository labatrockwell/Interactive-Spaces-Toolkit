(function() {
    var LT = namespace("com.rockwellgroup.lab.toolkit");

    LT.Network.NCS = function(app_name) {
        this.onConnectHooks     = [];
        this.onDisconnectHooks  = [];
        this.onMessageHooks     = [];
        this.onStartupHooks     = [];
        this.onActivateHooks    = [];
        this.onDeactivateHooks  = [];
        this.onShutdownHooks    = [];
        this.app_name = app_name;
    };

    LT.Network.NCS.prototype.connect = function(host, port, _) {
        var self = this;
        self.socket = io.connect("http://" + host + ":" + port + " ?id=1234");
        self.socket.on("message", self.onWSMessage.bind(self));
        if (typeof(_) === "function") _();
    };


    LT.Network.NCS.prototype.onMessage = function(fun) {
        if ( typeof fun !== "function" ){
            console.warn( "method passed to LT.Network.NCS.onMessage is not a function");
        } else {
            this.onMessageHooks.push(fun);
        }
    };

    LT.Network.NCS.prototype.sendMessage = function(route, value) {
        if (!this.socket)  {
            return console.log(LOG_ERROR, "[Network] Failed to find socket for", this);
        }

        value.app_name = this.app_name || "NCSTest";//@todo see if we can remove this w/o break of NCS
        value.route = route;
        console.log(LOG_EVENTS, "[Network] <-- SEND ", route, value.key, value);
        return this.socket.send(JSON.stringify(value));
    };

    // @todo extend to support other states beyond basic messaging
    LT.Network.NCS.prototype.onWSMessage = function(data){
        data = JSON.parse(data);
        console.log(LOG_EVENTS, "[Network] GET -->", data.route, data.key, data);
        if ( data.route ) {
            for (var i=0; i<this.onMessageHooks.length; i++){
                this.onMessageHooks[i](data.route, data);
            };
        } else {
            for (var i=0; i<this.onMessageHooks.length; i++){
                this.onMessageHooks[i]( "route", data );
            };
        }
    }

}).call(this);