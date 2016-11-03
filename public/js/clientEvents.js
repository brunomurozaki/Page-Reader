/*clientEvents.js*/

$(function(){init();})

function init(){
	configEvents();
	
}


function configEvents(){
	var address = $("#addressInput");
	var readButton = $("#readButton");
	var stopButton = $("#stopButton");
	address.on("keydown", onKeyPress);
	readButton.on("click", onButtonClick);
	stopButton.on("click", onStopButton);
	
}

function onKeyPress(e){
	var key = e.which;
	
	if(key == 13){
		sendMessageContent($(this).val());
		//$("#iframe").attr("src", $(this).val());
	}
	
}

function onStopButton(e){
	
	responsiveVoice.cancel();
}

function onButtonClick(e){
	var content = $(".content");
	
	responsiveVoice.speak(content.text(), "Brazilian Portuguese Female");
}
