var KeyUI = function( controller ) {
 	BaseUI.call(this, controller);

	$(window).bind("keypress", function(e) {
		console.log(e.charCode);
		switch (e.charCode) {
			case 112:
				controller.play();
				break;
			case 115:
				controller.stop();
				break;
			case 49:
				console.log(videos[0]);
				controller.load(videos[0]);
				break;
			case 50:
				console.log(videos[1]);
				controller.load(videos[1]);
				break;
			default:
				break;
		}
	}); 	
}

KeyUI.prototype = LAB.inherit(BaseUI.prototype); 
KeyUI.prototype.constructor = KeyUI;