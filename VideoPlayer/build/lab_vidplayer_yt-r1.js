// lab_vidplayer_yt-r1.js - https://github.com/labatrockwell/Interactive-Spaces-Toolkit
(function(){var a=namespace("com.rockwellgroup.lab.toolkit");a.Controller.YouTubeController=function(c,b){a.Controller.BaseVideoController.call(this,c,b)};a.Controller.YouTubeController.prototype=a.Util.inherit(a.Controller.BaseVideoController.prototype);a.Controller.YouTubeController.prototype.loadVideoById=function(a){this.target.getYouTubePlayer().loadVideoById(a,0,"highres")};a.Controller.YouTubeController.prototype.loadPlaylist=function(a){console.log(LOG_NARRATE,"[YouTubeController] Loading up playlist",
a);this.target.getYouTubePlayer().loadPlaylist(a,0,0,"highres")};a.Controller.YouTubeController.prototype.setVolume=function(a){console.log(LOG_NARRATE,"[VOLUME]2 ",a);this.target.setVolume(a)};a.Controller.YouTubeController.prototype.getVolume=function(){console.log(LOG_NARRATE,"[GET VOLUME]2 ",this.target.getVolume());this.target.getVolume()};a.Controller.YouTubeController.prototype.playVideo=function(){console.log(LOG_NARRATE,"[YouTubeController] Playing Video");this.target.getYouTubePlayer().playVideo()};
a.Controller.YouTubeController.prototype.nextVideo=function(){this.target.getYouTubePlayer().nextVideo()};a.Controller.YouTubeController.prototype.previousVideo=function(){this.target.getYouTubePlayer().previousVideo()};a.Controller.YouTubeController.prototype.pauseVideo=function(){this.target.getYouTubePlayer().pauseVideo()};a.Controller.YouTubeController.prototype.stopVideo=function(){this.target.getYouTubePlayer().stopVideo()};a.Controller.YouTubeController.prototype.playOrPauseVideo=function(){1==
this.target.getYouTubePlayer().getPlayerState()?this.pauseVideo():this.playVideo()};a.Controller.YouTubeController.prototype.clearVideo=function(){this.target.getYouTubePlayer().clearVideo()}}).call(this);
(function(){var a=namespace("com.rockwellgroup.lab.toolkit");a.Model.YouTubeVideo=function(c){a.Model.BaseVideo.call(this,c)};a.Model.YouTubeVideo.prototype=a.Util.inherit(a.Model.BaseVideo.prototype);a.Model.YouTubeVideo.prototype.initialize=function(a,b){void 0!==b?(this.setTitle(b.entry.title.$t),this.setDescription(b.entry.content.$t),"function"===typeof a&&a()):this.id?(console.log("fetch"),this.fetch(a)):"function"===typeof a&&a()};a.Model.YouTubeVideo.prototype.fetch=function(a){var b=this;
console.log(LOG_NARRATE,"[SINGLE YT Video] Fetch",b);$.ajax({url:"http://gdata.youtube.com/feeds/api/videos/"+b.id+"?alt=json",dataType:"json",cache:!1,success:function(d){b.setTitle(d.entry.title.$t);b.setDescription(d.entry.content.$t);"function"===typeof a&&a()},error:function(b){console.log(LOG_ERROR,"[YouTubeVideo] error",b);"function"===typeof a&&a()}})};a.Model.YouTubePlaylist=function(c){a.Model.BasePlaylist.call(this,c);console.log(LOG_NARRATE,"[YT Video] YouTubePlaylist",this,c)};a.Model.YouTubePlaylist.prototype=
a.Util.inherit(a.Model.BasePlaylist.prototype);a.Model.YouTubePlaylist.prototype.update=function(c,b){console.log(LOG_NARRATE,"[YT Playlist] UPDATE",c);if(c){console.log(LOG_NARRATE,"[YT Playlist] Data Update");this.title=c.playlistTitle;this.collection=[];for(var d in c.videoArray){var e=c.videoArray[d],f=new a.Model.YouTubeVideo(e.id);f.setTitle(e.title);f.setDescription(e.description);f.setCategory(e.category);f.setThumbnail(e.thumbnail||"http://img.youtube.com/vi/"+e.id+"/hqdefault.jpg");this.collection.push(f)}console.log(this);
b()}};a.Model.YouTubePlaylist.prototype.initialize=function(c,b){console.log(LOG_NARRATE,"[YT Playlist] Initialize",this,b);var d=this;if(b){console.log(LOG_NARRATE,"[YT Playlist] Data Initialize");console.log("Init from Admin",b);console.log(b.playlistTitle);console.log(b.videoArray);console.log(parseInt(b.playlistOrder));d.title=b.playlistTitle;d.description=b.playlistDescription;d.order=parseInt(b.playlistOrder);for(var e in b.videoArray){var f=b.videoArray[e],g=new a.Model.YouTubeVideo(f.id);
g.setTitle(f.title);g.setDescription(f.description);g.setCategory(f.category);g.setThumbnail(f.thumbnail||"http://img.youtube.com/vi/"+f.id+"/hqdefault.jpg");d.addItem(g)}console.log(d);c()}else console.log(LOG_NARRATE,"[YT Playlist] Test Initialize"),$.ajax({url:"./test/"+d.id+"-playlist.json",dataType:"json",cache:!1,success:function(b){d.title=b.title;d.description=b.description;d.order=b.order;for(var f in b.videos){var h=b.videos[f],e=new a.Model.YouTubeVideo(h.id);e.setTitle(h.title);e.setDescription(h.description);
e.setCategory(h.category);e.setThumbnail(h.thumbnail||"http://img.youtube.com/vi/"+h.id+"/hqdefault.jpg");d.addItem(e)}c()},error:function(a){console.log(LOG_ERROR,"[YouTubePlaylist] error",a);c()}})}}).call(this);
(function(){var a=namespace("com.rockwellgroup.lab.toolkit");a.View.YouTubeTarget=function(c,b){a.View.BaseVideoPlayerTarget.call(this,c,b)};a.View.YouTubeTarget.prototype=a.Util.inherit(a.View.BaseVideoPlayerTarget.prototype);a.View.YouTubeTarget.prototype.initialize=function(c,b){var d=this,e=void 0!==b.controls?b.controls:0,f=void 0!==b.showinfo?b.showinfo:0,g=void 0!==b.rel?b.rel:0,i=void 0!==b.cc_load_policy?b.cc_load_policy:0;d.id="c"+a.View.CID++;d.$el.html($("<div/>").prop("id",this.id));
console.log(YT.Player);d.yt_player=new YT.Player(d.id,{height:d.$el.height(),width:d.$el.width(),playerVars:{controls:e,showinfo:f,rel:g,iv_load_policy:3,cc_load_policy:i},events:{onReady:c,onStateChange:function(a){var b={};if(a.target&&a.target.getVideoUrl)b.video_id=d.getVideoId(a.target.getVideoUrl()),b.screen_id=d.screen_id;-1===a.data?$(document).trigger("videoLoaded",b):0===a.data?$(document).trigger("videoEnded",b):1===a.data?$(document).trigger("videoPlaying",b):2===a.data?$(document).trigger("videoPaused",
b):3===a.data?$(document).trigger("videoBuffering",b):5===a.data&&$(document).trigger("videoCued",b)}}})};a.View.YouTubeTarget.prototype.getYouTubePlayer=function(){return this.yt_player};a.View.YouTubeTarget.prototype.getVideoId=function(c){c=a.Util.queryString(c);if(c.v)return c.v};a.View.YouTubeTarget.prototype.goFullScreen=function(){this.original_height=this.$el.height();this.original_width=this.$el.width();this.getYouTubePlayer().setSize($(window).width(),$(window).height());this.$el.addClass("full-screen")};
a.View.YouTubeTarget.prototype.setVolume=function(a){console.log("[VIEW] ",a);this.getYouTubePlayer().setVolume(a)};a.View.YouTubeTarget.prototype.getVolume=function(){console.log("[VIEW] getVolume ",this.getYouTubePlayer().getVolume());return this.getYouTubePlayer().getVolume()};a.View.YouTubeTarget.prototype.leaveFullScreen=function(){this.getYouTubePlayer().setSize(this.original_width,this.original_height);this.$el.removeClass("full-screen")}}).call(this);
