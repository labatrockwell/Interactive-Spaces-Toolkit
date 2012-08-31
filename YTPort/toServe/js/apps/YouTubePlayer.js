$(function() {

    var LT = namespace("com.rockwellgroup.lab.toolkit");

    /*
    * YouTubePlayer Application
    *
    * A simple single-video display that loads a playlist 
    * and sends playback status over the network via IS
    *
    */
    var YouTubePlayer = function() {
        var qs = LT.Util.queryString(window.location.href); // query string
        var CONNECTION_TYPE = qs._c || "IS";  // choose between IS or NCS via _c query string (mostly for debug)
        var transTime = qs.t_time || 3000;

        var app = {
            state: 0, // hidden or visible

            // prepares the application to run
            initialize: function($el) {
                var self = this;
                console.log(LOG_NARRATE, "[YouTubePlayer] Launching app...");
                    // bind the app to a specific HTML element
                self.$el = $el;
                    // save screen id
                self.screen_id = LT.Util.queryString(window.location.search).id;
                self.initializeModel(function() {
                    self.initializeView(function() {
                            // we can only hide video player after onReady event
                        $("#youtube-player").hide();
                            // let's get the app setup...
                        self.initializeController(self.onReady.bind(self));
                    });
                });
            },
                // when the app is ready, we will run this...
            onReady: function() {

                var app = this;
                console.log(LOG_NARRATE, "[YouTubePlayer] ------- APP LAUNCHED ------", app);

                    // now that we're ready, let's tell everyone about our playlist
                app.connection.sendMessage(
                    "videoMessage", 
                    {"key":"playlistLoaded", "playlist": app.model}
                );


                    // listen for events
                $(document).bind("videoLoaded", function(e, data) {
                    data.key = "videoLoaded";
                    app.connection.sendMessage("videoMessage", data);
                });

                    // a video is playing now
                $(document).bind("videoPlaying", function(e, data) {
                    data.key = "videoPlaying";
                    app.connection.sendMessage("videoMessage", data);  
                });

                // a video just paused
                $(document).bind("videoPaused", function(e, data) {
                    data.key = "videoPaused";
                    app.connection.sendMessage("videoMessage", data);
                });

                // a video ended
                $(document).bind("videoEnded", function(e, data) {
                    data.key = "videoEnded";
                    app.connection.sendMessage("videoMessage", data); 
                });

                // the last video in a playlist just ended
                $(document).bind("playlistEnded", function(e, data) {
                    data.key = "playlistEnded";
                    //data.commander = inCommand;
                    app.connection.sendMessage("videoMessage", data);
                    console.log(LOG_NARRATE, data);
                });

            },

                // prepares YouTubePlaylist model
            initializeModel: function(_) {
                console.log(LOG_NARRATE, "[YouTubePlayer] <model>");
                
                if (!playlist_id) this.screen_id = "test";
                var playlist_id = this.screen_id;

                if (!playlist_id) {
                        // we need to receive a playlist ID from the query string
                    return console.log(LOG_ERROR, "[YouTubePlayer] Failed to start app, missing playlist ID in URL");
                }
                else {
                        // let's make our model based on playlist ID
                    console.log(LOG_INFO, "[YouTubePlayer] Loading playlist with ID " + playlist_id + "...");
                    app.model = new LT.Model.YouTubePlaylist(playlist_id);
                    this.model.initialize(_);
                }
            },

                // prepares YouTubeTarget view
            initializeView: function(_) {
                    // dynamically set default screen
                if (qs.transition) {
                    var bg_img = "";
                    if (qs.transition.substring(0, 4) == "http") {
                        bg_img = qs.transition;
                    } else {
                        bg_img = "//" + window.env[0] + ":" + window.env[1] + window.env[2] + "img/" + qs.transition;
                    }

                    $("#mask").css('background-image', "url(" + bg_img + ")");
                }
                    // our target references YouTube's video player HTML
                this.view = new LT.View.YouTubeTarget(this.screen_id, this.$el);
                    // let's setup our view, now...
                this.view.initialize(_);
            },
                // show video interface
            show: function() {

                if (this.state === 1) return;
                console.log(LOG_NARRATE, "------------ SHOWING VIDEO PLAYER ------------");
                this.state = 1;
                $("#youtube-player").fadeIn();
                $("#mask").fadeOut(transTime);

            },
                // hide video interface
            hide: function() {
                if (this.state === 0) return;
                console.log(LOG_NARRATE, "------------ HIDING VIDEO PLAYER ------------");
                this.controller.stopVideo();
                this.state = 0;
                $("#mask").fadeIn(transTime);
                $("#youtube-player").fadeOut();
            },
                // prepares YouTubeController
            initializeController: function(_) {                
                this.controller = new LT.Controller.YouTubeController(this.model, this.view);
                this.controller.initialize(function() {
                        // now bring the player full-screen right away
                    this.controller.goFullScreen();
                    //this.controller.setVolume(50);

                        // let's get this connection ready
                    this.initializeConnection(_);
                }.bind(this));
            },
                // prepares connection for interactivity messaging
            initializeConnection: function(_) {
                    // setup connection parameters
                var params = {
                    serverURL: window.location.hostname,
                    appName:"YouTubePlayer"
                }
                    // support local / NCS testing
                if (CONNECTION_TYPE == "NCS") {
                    params.serverPort = 8082;
                }
                    // create connection object
                this.connection = LT.Network.buildConnection(CONNECTION_TYPE, params);
                    // bind messages
                this.connection.onMessage(this.onMessage.bind(this));
                    // now connect with server
                this.connection.connect(_);
            },

                // any messages from Network/IS come through here...
            onMessage: function(route, data) {
                var app = this;
                app.onMessageForAll(route, data);
                    // target messages specifically for this screen
                if (data.screen_id == app.screen_id) app.onMessageForMe(route,data)

                if (route == "data"){
                    console.log(LOG_NARRATE, "[INCOMING DATA]", data);

                        // Test the Message's data
                        // if it has good attributes then send it along to model.update
                    if (data.videoArray || data.playlistTitle){
                        this.model.update(data, 
                            function(){
                                console.log('[YTPlayer] Model:Update() ',app.model);
                                app.connection.sendMessage(
                                    "videoMessage", 
                                    {"key":"playlistLoaded", "playlist": app.model}
                                );
                            }.bind(app)
                        );
                    }
                    

                }

            },  
                // receive wildcard messages intended for all screens
            onMessageForAll: function(route, data) {

                if (data.route == "volume"){
                    console.log(LOG_NARRATE, "[VOLUME ON MESSAGE]", data, data.data.volume);
                    
                    // if (this.muted != true){
                    //     this.muted = true;
                    //     this.controller.setVolume(0);
                    // } else {
                    //     this.muted = false;
                    //     this.controller.setVolume(100);
                    // }

                    this.controller.setVolume(data.data.volume);
                }
                    // ignore non-video messages
                if (data.route != "videoMessage") return;
                    // handle transitions based on network activity
                if (data.key == "loadSingleVideo" || data.key == "loadAllVideos") {
                    if (data.screen_id != app.screen_id) {
                        // a video is playing somewhere else
                        app.hide();
                    }
                    else {
                        app.show();
                    }

                }
                // ask player for a pingback identifying its playlist
                else if (data.key == "requestPlaylists") {
                    app.connection.sendMessage(
                        "videoMessage", 
                        {"key": "playlistLoaded", "playlist": app.controller.playlist}
                    );
                }

                    // enable hiding of all screens
                if (data.key == "hideAll") app.hide();
            },
                // these messages are specifically targeted for this screen/player
            onMessageForMe: function(route,data) {
                    // tell player to load a video
                if (data.key == "loadSingleVideo") {
                    app.controller.loadSingleVideo(data.video_id, function() {
                        app.connection.sendMessage(
                            "videoMessage", 
                            {"key": "videoPlaybackComplete", "video_id": data.video_id, "screen_id": app.screen_id}
                        );
                        app.hide();
                    });
                }
                    // tell player to load all videos
                else if (data.key == "loadAllVideos") {
                    app.controller.loadAllVideos(function() {
                        app.connection.sendMessage(
                            "videoMessage", 
                            {"key": "allVideoPlaybackComplete", "video_id": data.video_id, "screen_id": app.screen_id}
                        );
                        app.hide();
                    });
                }
                    // tell player to play active video
                else if (data.key == "playVideo") {
                    app.show();
                    app.controller.playVideo();
                }
                    // tell player to toggle between play or pause state
                else if (data.key == "playOrPauseVideo") {
                    app.show();
                    app.controller.playOrPauseVideo();
                }
                    // tell player to pause active video
                else if (data.key == "pauseVideo") {
                    app.controller.pauseVideo();
                }
                    // tell player to stop video and hide video interface
                else if (data.key == "stopVideo") {
                    app.hide();
                    app.controller.stopVideo();
                }
            }
        };
        
        //initialize for the video with class of "lt-video" only
        app.initialize($(".lt-video"));
        //app.initializeConnection(
        //    function(){ console.log("[Connection Done]"); }
        //);

        
            // place app on global namespace
        window.app = app;
        return app;
    }.call();

});