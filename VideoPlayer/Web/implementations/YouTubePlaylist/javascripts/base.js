$(function() {

    // custom user interface can be built here

    var LT = namespace("com.rockwellgroup.lab.toolkit");


    // create view for each dom object with a role of "lv-player"    
    function createTestVideo(k,v) {


        // build youtube video source
        var playlist = new LT.Model.YouTubePlaylist("PLED98551580A18CA3");
        playlist.initialize(function() {

            // create youtube video target
            var target = new LT.View.YouTubeTarget($(v));
            target.initialize(function() {
            
                // new player controller to match with target
                var player = new LT.Controller.YouTubeController(playlist, target);
                player.initialize(function() {

                    var $status = $(v).closest(".panel").find(".status");

                    $(v).bind("video-loaded", function() {
                        $status.html('<span class="secondary round label">Loading</span>');  
                    });


                    $(v).bind("video-playing", function() {
                        $status.html('<span class="success round label">Playing</span>');  
                    });

                    $(v).bind("video-paused", function() {
                        $status.html('<span class="alert round label">Paused</span>');
                    });

                    $(v).bind("video-ended", function() {
                        $status.html('<span class="alert round label">Stopped</span>');
                        player.nextVideo();
                    });

                    $(v).bind("playlist-ended", function() {
                        $status.html('<span class="alert round label">Complete</span>');
                        console.log("playlist ended...");
                    });

                    $(v).bind("video-title-changed", function(e, title) {
                        $(".lt-video-title").html(title);
                    });

                    $(v).bind("video-description-changed", function(e, desc) {
                        $(".lt-video-description").html(desc);
                    });


                    // player.playVideo(function() {
                    //     console.log("FINISHED PLAYING VIDEO");
                    // });

                    player.playVideo();



                    // bind player related events
                    $(".button.go-full-screen").click(function() {
                        $("#modal, #backdrop").show();
                        player.goFullScreen();
                        return false;
                    });
                    
                    $(".button.play-pause").click(function() {
                        player.playOrPauseVideo();
                        return false;
                    });

                    $(".button.next").click(function() {
                        player.nextVideo();
                        return false;
                    });

                    $(".button.prev").click(function() {
                        player.previousVideo();
                        return false;
                    });

                    $("#modal-close").click(function() {
                        $("#modal, #backdrop").hide();
                        player.leaveFullScreen();
                    });


                });
            });
        });
    }

    // wait for youtube api to activate...
    window.onYouTubeIframeAPIReady = function() {
        // these will be our (1+) video players
        $('*[data-role="lt-video"]').each(createTestVideo);
    }
});