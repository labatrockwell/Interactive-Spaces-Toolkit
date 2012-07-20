var KeyUI = function( controller ) {
 	BaseUI.call(this, controller);

	$(window).bind("keypress", function(e) {
		console.log(e.charCode);
		switch (e.charCode) {
			case 115:
				videoControls.start();
				break;
			case 116:
				videoControls.stop();
				break;
			case 109:
				videoControls.load("8uDuls5TyNE");
				break;
			case 103:
				videoControls.load("8lXdyD2Yzls");
				break;
			case 114:
				videoControls.load("oHg5SJYRHA0");
				break;				
			case 99:
				videoControls.load("EwTZ2xpQwpA");
				break;				
			case 100:
				videoControls.load("OQSNhk5ICTI");
				break;				
			default:
				break;
		}
	}); 	
}

KeyUI.prototype = LAB.inherit(BaseUI.prototype); 
KeyUI.prototype.constructor = KeyUI;