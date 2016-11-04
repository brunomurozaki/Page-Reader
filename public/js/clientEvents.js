/*clientEvents.js*/

$(function(){init();})

function init(){
	configEvents();
	
}


function configEvents(){
	var address = $("#addressInput");
	var readButton = $("#readButton");
	var stopButton = $("#stopButton");
	var goButton = $("#goButton");
	
	address.on("keydown", onKeyPress);
	readButton.on("click", onReadButtonClick);
	stopButton.on("click", onStopButtonClick);
	goButton.on("click", onGoButtonClick)
	
}

function onKeyPress(e){
	var key = e.which;
	
	if(key == 13){
		callUrlPage($(this).val());
		//$("#iframe").attr("src", $(this).val());
	}
}

function callUrlPage(url){
	sendMessageContent(url);
}

function onGoButtonClick(e){
	callUrlPage($("#addressInput").val());
}

function onStopButtonClick(e){
	
	responsiveVoice.cancel();
}

function onReadButtonClick(e){
	var content = $(".content");
	
	responsiveVoice.speak(content.text(), "Brazilian Portuguese Female");
}
