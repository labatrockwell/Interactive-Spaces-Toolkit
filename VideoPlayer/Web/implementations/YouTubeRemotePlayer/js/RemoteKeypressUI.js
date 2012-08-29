var KeyUI = function( controller ) {
 	BaseUI.call(this, controller);

	$(window).bind("keypress", function(e) {
		console.log("[KEYPRESS] Code=" + e.charCode);
		switch (e.charCode) {
			case 112:
				controller.play();
				break;
			case 115:
				controller.stop();
				break;
			case 46:
				// toggle full screen
				controller.view.toggleFullscreen();
				break;
			case 109:
			case 49:
				console.log("[KEYPRESS] Video ID: http://www.youtube.com/watch?v=8uDuls5TyNE");
				controller.load("8uDuls5TyNE");
				break;
			case 103:
			case 50:
				console.log("[KEYPRESS] Video ID: http://www.youtube.com/watch?v=IJJ8_qNELqw");
				controller.load("IJJ8_qNELqw");
				break;
			case 114:
			case 51:
				console.log("[KEYPRESS] Video ID: http://www.youtube.com/watch?v=TbiedguhyvM");
				controller.load("TbiedguhyvM");
				break;
			case 99:
			case 52:
				console.log("[KEYPRESS] Video ID: http://www.youtube.com/watch?v=oHg5SJYRHA0");
				controller.load("oHg5SJYRHA0");
				break;				
			default:
				break;
		}
	}); 	
}

KeyUI.prototype = LAB.inherit(BaseUI.prototype); 
KeyUI.prototype.constructor = KeyUI;