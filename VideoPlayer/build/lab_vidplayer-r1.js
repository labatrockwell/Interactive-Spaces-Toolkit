// lab_vidplayer-r1.js - https://github.com/labatrockwell/Interactive-Spaces-Toolkit
function namespace(a){for(var a=a.split("."),b=window,c="",d=0,e=a.length;d<e;d++)c=a[d],b[c]=b[c]||{},b=b[c];return b}
(function(){var a=namespace("com.rockwellgroup.lab.toolkit");a.Model=a.Model||{};a.View=a.View||{CID:0};a.UI=a.UI||{};a.Controller=a.Controller||{};a.Network=a.Network||{};a.Util={inherit:function(b){function a(){}if(null!=b){if(Object.create)return Object.create(b);var d=typeof b;if("object"!==d&&"function"!==d)throw TypeError();a.prototype=b;return new a}},queryString:function(b){for(var a=[],d=b.slice(b.indexOf("?")+1).split("&"),e=0;e<d.length;e++)b=d[e].split("="),a.push(b[0]),a[b[0]]=b[1];return a},
loadScript:function(b,a){var d;d=document.createElement("script");d.onload=function(){if("function"===typeof a)return a()};d.src=b;return document.getElementsByTagName("head")[0].appendChild(d)}};a.log=function(){if(!a.debug_level)a.debug_level=a.Util.queryString(window.location.search).debug||1;var b=Array.prototype.slice.call(arguments);"number"==typeof b[0]?(console.log(a.debug_level),a.debug_level&&b[0]<=a.debug_level&&(b=b.slice(1,b.length),console.log(b))):console.log(b)}}).call(this);
var LOG_ERROR=1,LOG_INFO=2,LOG_EVENTS=3,LOG_NARRATE=4,LOG_ALL=5;
(function(){var a=namespace("com.rockwellgroup.lab.toolkit"),b=namespace("com.rockwellgroup.lab.toolkit.Controller");a.Controller.BaseVideoController=function(b,a){this.playlist=b;this.target=a};b.BaseVideoController.prototype.initialize=function(b){var a=this;$(document).bind("videoPlaying",function(b,c){try{a.playlist.setItemIndex(c.video_id);var f=a.playlist.getItemActive();$(document).trigger("videoTitleChanged",f.title);$(document).trigger("videoDescriptionChanged",f.description);a.playlist.getItemIndex()==
a.playlist.getItemIndexLast()&&(console.log(LOG_NARRATE,"[BaseVideo] Playlist ends after this one",c),$(document).bind("videoEnded",function(){a.clearVideo();if("function"==typeof a.onPlaylistEnd)a.onPlaylistEnd(),a.onPlaylistEnd=null}))}catch(g){}});$(document).bind("videoEnded",function(){if("function"===typeof a.onVideoEnd)a.clearVideo(),a.onVideoEnd(),a.onVideoEnd=null});$(document).bind("videoLoaded",function(){$(document).trigger("videoTitleChanged","");$(document).trigger("videoDescriptionChanged",
"")});"function"===typeof b&&b()};a.Controller.BaseVideoController.prototype.setVolume=function(a){console.log("[CONTROLLER]2 ",a,50);this.target.setVolume(a)};a.Controller.BaseVideoController.prototype.getVolume=function(){this.target.getVolume()};a.Controller.BaseVideoController.prototype.goFullScreen=function(){this.target.goFullScreen()};a.Controller.BaseVideoController.prototype.leaveFullScreen=function(){this.target.leaveFullScreen()};a.Controller.BaseVideoController.prototype.loadFirstVideo=
function(a){var b=this.playlist.getItemFirst();console.log(LOG_NARRATE,"[BaseVideoController] Loading first video",b);this.loadSingleVideo(b.id,a)};a.Controller.BaseVideoController.prototype.loadSingleVideo=function(a,b){console.log(LOG_NARRATE,"[BaseVideoController] Play a single video and stop",a);this.onVideoEnd=b;this.onPlaylistEnd=null;this.loadVideoById(a)};a.Controller.BaseVideoController.prototype.loadAllVideos=function(a){console.log(LOG_NARRATE,"[BaseVideoController] Play all videos and stop",
this.playlist.getIdList());this.onPlaylistEnd=a;this.onVideoEnd=null;this.loadPlaylist(this.playlist.getIdList())};a.Controller.BaseVideoController.prototype.loadVideoById=function(){};a.Controller.BaseVideoController.prototype.loadPlaylist=function(){};a.Controller.BaseVideoController.prototype.playVideo=function(){};a.Controller.BaseVideoController.prototype.pauseVideo=function(){};a.Controller.BaseVideoController.prototype.stopVideo=function(){};a.Controller.BaseVideoController.prototype.playOrPauseVideo=
function(){};a.Controller.BaseVideoController.prototype.nextVideo=function(){};a.Controller.BaseVideoController.prototype.previousVideo=function(){};a.Controller.BaseVideoController.prototype.clearVideo=function(){}}).call(this);
(function(){var a=namespace("com.rockwellgroup.lab.toolkit");a.Model.BaseVideo=function(a){this.description=this.title="";this.id=a;this.thumbnail=this.category=""};a.Model.BaseVideo.prototype.initialize=function(a){"function"===typeof a&&a()};a.Model.BaseVideo.prototype.setTitle=function(a){if(a)this.title=a};a.Model.BaseVideo.prototype.setDescription=function(a){if(a)this.description=a};a.Model.BaseVideo.prototype.setCategory=function(a){if(a)this.category=a};a.Model.BaseVideo.prototype.setThumbnail=
function(a){if(a)this.thumbnail=a};a.Model.BasePlaylist=function(a){this.id=a;this.description=this.title="";this.order=0;this.collection=[];this.index=0};a.Model.BasePlaylist.prototype={initialize:function(a){a()},addItem:function(a){console.log(LOG_INFO,"[Playlist] + ",a);this.collection.push(a)},setItemIndex:function(a){if(a){for(var c in this.collection)if(this.collection[c].id===a)this.index=c;console.log(LOG_NARRATE,"[Playlist] Updated active video to ",a,this.index,this.getItemActive())}else console.log(LOG_ERROR,
"[Playlist] Video is invalid",a)},getItemIndex:function(){return this.index},getItemIndexLast:function(){return this.collection.length-1},getItemAt:function(a){return this.collection[a]},getItemActive:function(){return this.getItemAt(this.index)},getItemFirst:function(){return this.getItemAt(0)},getNumItems:function(){return this.collection.length},getIdList:function(){var a=[],c;for(c in this.collection)a.push(this.collection[c].id);return a}}}).call(this);
(function(){var a=namespace("com.rockwellgroup.lab.toolkit");a.View.BaseVideoPlayerTarget=function(a,c){this.screen_id=a;this.$el=c};a.View.BaseVideoPlayerTarget.prototype.initialize=function(a){"function"===typeof a&&a()}}).call(this);