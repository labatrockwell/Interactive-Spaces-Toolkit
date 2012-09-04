//we are loading the presets template as js because of
//cross-domain policies restricting us from loading html remotely.
//ideally we could turn off cross-domain limitations for the
//static server activity.
var TEMPLATE_DATA = '\
		<div id="start_screen" style="display:" class="admin_message">\
			Hello. You should not be seeing this screen. Is Javascript working? Does your browser support websockets? Are there any errors in the console? Did you set a breakpoint? As much as I would like to solve this problem for you... you are on your own.\
		</div>\
		<div id="not_activated" class="admin_message" style="display:none">\
			Not currently activated. Please activate via <i>Interactive Spaces</i>.\
		</div>\
		<div id="connecting" style="display:none" class="admin_message">\
			Connecting to backend\
		</div>\
		<div id="connected" style="display:none" class="admin_message">\
			Connected to backend. Waiting for data.\
		</div>\
		<div id="failed_connection" style="display:none" class="admin_message">\
			Error while connecting to backend\
		</div>\
		<div id="disconnected" style="display:none" class="admin_message">\
			Disconnected from backend\
		</div>\
		<div id="admin_locked" style="display:none" class="admin_message">\
			Someone else is using this admin, you cannot access it currently\
		</div>\
		<section id="settingsContainer" style="display:none" >\
			<div class="detailHeader">\
				<div class="floater indent">Current Settings</div>\
				<!--\
					the options hard-coded in this drop-down are for debugging only\
					they are cleared out and replaced with actual presets once\
					the webpage connects with the python backend\
				-->\
				<div class="floater">\
					<div>\
						<select id="ddlPresets" class="presets">\
							<option value="preset1">Preset Number 1</option>\
							<option value="preset2">Preset Number 2</option>\
							<option value="preset3">Preset Number 3</option>\
							<option value="preset4">Preset Number 4</option>\
						</select>\
					</div>\
				</div>\
				<div class="floater">\
					<div class="presetsLink newPreset" id="btnNewPreset" title="plus icon">New Preset</div>\
				</div>\
				<div class="floater">\
					<div class="presetsLink deletePreset" id="btnDeletePreset" title="minus icon">Delete Preset</div>\
				</div>\
				<div class="floater">\
					<div class="presetsLink renamePreset" id="btnRenamePreset" title="minus icon">Rename</div>\
					<div class="reveal renameBox">\
						<div class="settingHeader">New Name</div>\
						<div><input type="textbox" id="txtPresetName" /></div>\
					</div>\
				</div>\
				<input class="button" type="button" id="btnSave" value="Save" />\
			</div>\
			<div id="customAdminContent">\
				{{{admin_content}}}\
			</div>\
\
		</section>';
		