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
	sendMessage("POST", "/event", {url:"http://www1.folha.uol.com.br/poder/2016/11/1829156-marcelo-odebrecht-tera-que-cumprir-cinco-anos-de-prisao-domiciliar.shtml"});
}

function successfulRequest(data){
	$(".content").html(data);
}