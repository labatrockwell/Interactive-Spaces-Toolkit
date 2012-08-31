/*!
 * \namespace IS
 * \brief 
 *
 * @author      The Lab
 * @modified    07/19/2012
 * @version     0.1.0
 */
var IS = IS || {};
/*!
 * \namespace IS.Presets
 * \brief A javascript library to handle presets on the admin side
 * <br />Copyright (C) 2012 LAB at Rockwell Group http://lab.rockwellgroup.com
 *
 */
IS.Presets = IS.Presets || {};

/*! 
 * \class IS::Presets::Handler
 * \brief sets up the event listeners to manage presets
 * \param interactiveSpaces the ISjs::Connection object that this class can connect to for messages
 * \param selectPresetsDropDown the html drop down list that the handler can populate with presets data
 * \param newPresetsButton the button which will trigger a "new preset" event based off its onclick event
 * \param delPresetsButton the button which will trigger a 'delete preset' event based off its onclick event
*/
IS.Presets.Handler = function(selectPresetsDropDown){
	this.gotData = false;
	this.currState = 'setup';

	this.setIdentifierKey("toControl");
	this.events = new LAB.EventDispatcher(this);
	this.events.addEventListener(IS.EventType.PresetListReceived, this.newPresetList.bind(this));
	this.events.addEventListener(IS.EventType.StateUpdate, this.stateUpdate.bind(this));
	this.events.addEventListener(IS.EventType.CreatedISConnection, this.registerForISEvents.bind(this));
	this.events.addEventListener(IS.EventType.NewPresetData, this.newPresetData.bind(this));
	this.events.addEventListener(IS.EventType.FileUploadReceived, this.newFileUploaded.bind(this));
	this.events.addEventListener(IS.EventType.PostMarkupSetup, this.domAvailable.bind(this));

	//add event listeners for state changes
	this.events.addEventListener(IS.EventType.StateLocked, this.onLocked.bind(this));
	this.events.addEventListener(IS.EventType.StateUnlocked, this.onUnlocked.bind(this));
	this.events.addEventListener(IS.EventType.StateShared, this.onShared.bind(this));
	this.events.addEventListener(IS.EventType.StateAlone, this.onAlone.bind(this));
};

IS.EventType = {
	PreMarkupSetup:"pre-markup setup",
	PostMarkupSetup:"post-markup setup",
	CreatedISConnection:"post-create IS Connection",
	SelectedNewPreset:"selected new preset",
	SavePresetData:"save preset data",

	RoutePrefix:"route:",
	ConfigsReceived:"route:configs",
	StateUpdate:"route:admin_state",
	NewPresetData:"route:data",
	PresetListReceived:"route:presets",
	FileUploadReceived:"route:fileupload",

	StatePrefix:"state:",
	StateLocked:"state:locked",
	StateUnlocked:"state:unlocked",
	StateShared:"state:shared",
	StateAlone:"state:alone",
	StateStartup:"state:startup",
	StateActivate:"state:activate",
	StateDeactivate:"state:deactivate",
	StateShutdown:"state:shutdown"
};

IS.Presets.Handler.prototype.newFileUploaded = function(data){
	console.log( data );
	console.log( "yay! a file!" );
};

IS.Presets.Handler.prototype.newPresetData = function(data){
	if (!this.gotData){
		this.gotData = true;
		hideDivs("connected");
		showDivs('settingsContainer');
	}
	//put the preset name in the text box so it can be edited
	$("#txtPresetName").val(data.name);
}

IS.Presets.Handler.prototype.registerForISEvents = function(e){
	e.interactiveSpaces.onMessage(this.onMessage.bind(this));
	e.interactiveSpaces.onConnect(this.onConnect.bind(this));
	e.interactiveSpaces.onDisconnect(this.onDisconnect.bind(this));
	e.interactiveSpaces.onActivate(this.onActivate.bind(this));
	e.interactiveSpaces.onDeactivate(this.onDeactivate.bind(this));
	e.interactiveSpaces.onStartup(this.onStartup.bind(this));
	e.interactiveSpaces.onShutdown(this.onShutdown.bind(this));
};

IS.Presets.Handler.prototype.connect = function(){
	//event: about to set up markup
	//set up markup
	this.setupMarkup();
};

IS.Presets.Handler.prototype.domAvailable = function(){
	//push data to the backend when the save button is pushed
	$("#btnSave").click(this.savePresetData.bind(this));
	$("#btnNewPreset").click(this.newPreset.bind(this));
	$("#btnDeletePreset").click(this.deletePreset.bind(this));
	$("#btnRenamePreset").click(this.showRenamePreset.bind(this));
	$("#txtPresetName").change(this.renamePreset.bind(this));

	this.ddlPresets = $("#ddlPresets");
	if (this.ddlPresets.length > 0){
		this.ddlPresets.change(this.updatePreset.bind(this));
	}

	$("#fileUpload form").submit(function(event) {
		event.preventDefault();

		uploadFiles();
	});
};

IS.Presets.Handler.prototype.addEventListener = function(eventType, callback){
	console.log("adding listener for " + eventType);
	this.events.addEventListener(eventType, callback);
}

IS.Presets.Handler.prototype.savePresetData = function(e){
	if (e){ e.preventDefault(); }
	var settings = {};
	this.events.dispatchEvent(IS.EventType.SavePresetData, {settings:settings});
	this.saveData(settings);
};

IS.Presets.Handler.prototype.markupSetUp = function(){
	//event: done setting up markup
	this.events.dispatchEvent(IS.EventType.PostMarkupSetup);
	//create interactiveSpaces Connection object
	this.interactiveSpaces = new ISjs.Connection();
	//event: created IS object
	this.events.dispatchEvent(IS.EventType.CreatedISConnection, {interactiveSpaces:this.interactiveSpaces});
	//connect to IS

	this.controlIdentifier = LAB.getQueryString(this.controlIdentifierKey);

	try{
		this.hideAllDivs();
		showDivs('connecting');
		this.interactiveSpaces.connect();
	} catch (err){
		this.hideAllDivs();
		showDivs('failed_connection');
	}
};

/** 
 * Load handlebars templates from external files
 */
getTemplateAjax = function(path, callback) {
    $.ajax({
        url: path,
        dataType: "html",
        cache: false,
        success: callback
    });         
};

IS.Presets.Handler.prototype.setupMarkup = function() {
	var markupSetUp = this.markupSetUp.bind(this);
	//we are loading the presets template as js because of
	//cross-domain policies restricting us from loading html remotely.
	//ideally we could turn off cross-domain limitations for the
	//static server activity.
	require([BASEPATH+"html/presets_template.handlebar.html.js"], function(){
		getTemplateAjax("admin_content.handlebar.html", function(adminData){
			var template = Handlebars.compile(TEMPLATE_DATA);
			var context = {admin_content:adminData};
			var html = template(context);
			$("body").html(html);
			markupSetUp();
		});
	});
};

/*!
 * \fn IS::Presets::Handler::onMessage
 * \brief a callback function to intercept messages from IS
 * \memberof IS::Presets::Handler
 * \param route the route that the message was received on
 * \param data the data that was sent on the route
*/
IS.Presets.Handler.prototype.onMessage = function(route, data){
	console.log("triggering " + IS.EventType.RoutePrefix+route);
	this.events.dispatchEvent(IS.EventType.RoutePrefix+route, {message:data});
};

IS.Presets.Handler.prototype.newPresetList = function(e){
	this.ddlPresets.empty();
	$.each(e.message.list, function(index, value){
		this.ddlPresets.append($("<option>").val(value.val).html(value.text));
	}.bind(this));
	this.ddlPresets.val(e.message.selected);
};

IS.Presets.Handler.prototype.stateUpdate = function(e){
	this.events.dispatchEvent(IS.EventType.StatePrefix+e.message.state);
};

/*!
 * \fn IS::Presets::Handler::onConnect
 * \brief a callback function when IS connects
 * \memberof IS::Presets::Handler
*/

IS.Presets.Handler.prototype.onConnect = function(){
	if (this.controlIdentifier){
		this.interactiveSpaces.sendMessage("controlIdentifier", {data:this.controlIdentifier});
	}

	this.hideAllDivs();
	showDivs("connected",'not_activated');
};


/*!
 * \fn IS::Presets::Handler::renamePreset
 * \brief this function will rename the current preset to the specified name
 * \memberof IS::Presets::Handler
 * \param newName the new name to get the current preset
*/
IS.Presets.Handler.prototype.renamePreset = function(e){
	if (e){e.preventDefault();}
	this.interactiveSpaces.sendMessage("presets",{data:'rename',newName:$("#txtPresetName").val()});
};

/*!
 * \fn IS::Presets::Handler::deletePreset
 * \brief deletes the current preset
 * \memberof IS::Presets::Handler
*/
IS.Presets.Handler.prototype.deletePreset = function(e){
	if (e){
		try{
			e.preventDefault();
		} catch(err) {}
	}
	this.interactiveSpaces.sendMessage("presets", {data:"delete"});
};

/*!
 * \fn IS::Presets::Handler::showRenamePreset
 * \brief deletes the current preset
 * \memberof IS::Presets::Handler
*/
IS.Presets.Handler.prototype.showRenamePreset = function(e){
	console.log("Rename")
	if (e){
		try{
			e.preventDefault();
		} catch(err) {}
	}
	//this.interactiveSpaces.sendMessage("presets", {data:"delete"});
	if ($(".renameBox").is( ":visible" )){
		$(".renameBox").hide();
	} else {
		$(".renameBox").show();	
	}
	
};

/*!
 * \fn IS::Presets::Handler::newPreset
 * \brief creates a new preset
 * \memberof IS::Presets::Handler
*/
IS.Presets.Handler.prototype.newPreset = function(e){
	if (e){
		try{
			e.preventDefault();
		} catch(err) {}
	}
	this.interactiveSpaces.sendMessage("presets", {data:"new"});
};

/*!
 * \fn IS::Presets::Handler::updatePreset
 * \brief select a new preset
 * \memberof IS::Presets::Handler
*/
IS.Presets.Handler.prototype.updatePreset = function(e){
	if (e){
		try{
			e.preventDefault();
		} catch(err) {}
	}
	this.events.dispatchEvent(IS.EventType.SelectedNewPreset);
	this.interactiveSpaces.sendMessage("presets",{data:{preset:this.ddlPresets.val()}});
};

IS.Presets.Handler.prototype.saveData = function(data){
	this.interactiveSpaces.sendMessage("data",{data:data});
};

IS.Presets.Handler.prototype.setIdentifierKey = function(value){
	this.controlIdentifierKey = value;
};

IS.Presets.Handler.prototype.setIdentifier = function(value){
	this.controlIdentifier = value;
	if (this.interactiveSpaces.bConnected){
		this.interactiveSpaces.sendMessage("controlIdentifier", {data:value});
	}
};

IS.Presets.Handler.prototype.getIdentifier = function(value){
	return this.controlIdentifier;
};

IS.Presets.Handler.prototype.onLocked = function(){
	this.hideAllDivs();
	showDivs("admin_locked");
};

IS.Presets.Handler.prototype.onUnlocked = function(){
	this.hideAllDivs();
	if (this.gotData){
		showDivs("settingsContainer");
	} else {
		showDivs("connected");
	}
	if (currState != 'activate'){
		showDivs("not_activated");
	}
};

IS.Presets.Handler.prototype.onShared = function(){
	showDivs("sharing_msg");
};

IS.Presets.Handler.prototype.onAlone = function(){
	hideDivs("sharing_msg");
};

IS.Presets.Handler.prototype.onDisconnect = function(){
	this.hideAllDivs();
	showDivs('disconnected');
	this.gotData = false;
};

applyCss = function(cssProperty, cssValue, ids){
	for(var i = 2; i < arguments.length; i++){
		$('#'+arguments[i]).css(cssProperty, cssValue);
	}
};

showDivs = function(){
	applyCss.apply(this, ["display",""].concat(argumentsToArray(arguments)));
};

argumentsToArray = function(argumentsObj){
	return Array.prototype.slice.call(argumentsObj);
};

hideDivs = function(){
	applyCss.apply(this, ["display","none"].concat(argumentsToArray(arguments)));
};

IS.Presets.Handler.prototype.hideAllDivs = function(){
	hideDivs('disconnected','connecting','not_activated','admin_locked', 'settingsContainer', 'failed_connection','connected','start_screen');
};

IS.Presets.Handler.prototype.uploadFiles = function(){
	fileInput = $("#fileuploadinput");
	if (fileInput[0].files.length > 0){
		//load file
		var reader = new FileReader();
		reader.filename = fileInput[0].files[0].name;
		reader.onerror = function(e){
			console.error(e);
		};
		reader.onload = function(e) {
			currImgSrc = e.target.result;
			interactiveSpaces.sendMessage( "fileupload", {"data":currImgSrc,"filename":this.filename} );
		};
		reader.readAsDataURL(fileInput[0].files[0]);
	}
};

IS.Presets.Handler.prototype.onDeactivate = function(){
	currState = 'deactivate';
	this.showWaitForActivation();
	this.events.dispatchEvent(IS.EventType.StateDeactivate);
};

IS.Presets.Handler.prototype.onStartup = function(){
	currState = 'startup';
	this.showWaitForActivation();
	this.events.dispatchEvent(IS.EventType.StateStartup);
};

IS.Presets.Handler.prototype.showWaitForActivation = function(){
	showDivs("not_activated");
};

IS.Presets.Handler.prototype.onActivate = function(){
	currState = 'activate';
	hideDivs("not_activated");
	this.events.dispatchEvent(IS.EventType.StateActivate);
};

IS.Presets.Handler.prototype.onShutdown = function(){
	currState = 'shutdown';
	this.events.dispatchEvent(IS.EventType.StateShutdown);
};
