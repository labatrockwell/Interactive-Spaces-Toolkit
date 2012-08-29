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
				console.log("[KEYPRESS] 8uDuls5TyNE");
				controller.load("8uDuls5TyNE");
				break;
			case 103:
			case 50:
				console.log("[KEYPRESS] 8lXdyD2Yzls");
				controller.load("8lXdyD2Yzls");
				break;
			case 114:
			case 51:
				console.log("[KEYPRESS] oHg5SJYRHA0");
				controller.load("oHg5SJYRHA0");
				break;				
			case 99:
			case 52:
				console.log("[KEYPRESS] 8uDuls5TyNE");
				controller.load("EwTZ2xpQwpA");
				break;				
			case 100:
			case 53:
				console.log("[KEYPRESS] Video ID: TbiedguhyvM http://youtube.com/TbiedguhyvM");
				controller.load("TbiedguhyvM");
				break;				
			default:
				break;
		}
	}); 	
}

KeyUI.prototype = LAB.inherit(BaseUI.prototype); 
KeyUI.prototype.constructor = KeyUI;