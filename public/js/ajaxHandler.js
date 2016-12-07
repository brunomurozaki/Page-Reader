/*ajaxHandler*/

function sendMessage(method, event, content){
	$.ajax({
			url: event, 
			data: content, 
			type:method, 
			success:successfulRequest, 
			contentType: "application/x-www-form-urlencoded; charset=windows-1252"
			});
}

function sendMessageContent(content){
	sendMessage("POST", "/event", {url:content});
}

function successfulRequest(data){
	$(".content").html(data);
}