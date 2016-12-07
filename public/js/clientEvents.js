/*clientEvents.js*/

$(function(){init();})

function init(){
	configEvents();
	
}

enterStatus = 0;


function configEvents(){
	var address = $("#addressInput");
	var readButton = $("#readButton");
	var stopButton = $("#stopButton");
	var goButton = $("#goButton");
	
	$(document).on("keydown", onKeyPress);
	address.on("focus", onAddressInputFocus);
	readButton.on("click", onReadButtonClick);
	stopButton.on("click", onStopButtonClick);
	goButton.on("click", onGoButtonClick)
	
}

function onAddressInputFocus(e){
	enterStatus = 0;
	
}

function onKeyPress(e){
	var key = e.which;
	
	if(key == 13){
		
		switch(enterStatus){
			case 0:
			{
				var val = $("#addressInput").val();
				if(val.length > 0){
					callUrlPage(val);
					enterStatus++;
				}
				
				break;
			}
			case 1: {
				readContent();
				enterStatus++;
				break;
			}
			case 2: {
				stopReading();
				enterStatus = 0;
				break;
			}
			default:
		}

		//$("#iframe").attr("src", $(this).val());
	}
}

function callUrlPage(url){
	sendMessageContent(url);
}

function onGoButtonClick(e){
	callUrlPage($("#addressInput").val());
}


function readContent(){
	var content = $(".content");
	
	responsiveVoice.speak(content.text(), "Brazilian Portuguese Female");
}

function stopReading(){
	responsiveVoice.cancel();
}

function onStopButtonClick(e){
	stopReading();
}

function onReadButtonClick(e){
	readContent();
}
