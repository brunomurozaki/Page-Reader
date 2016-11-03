var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var jsdom = require('jsdom');

var app = express();

// Arquivos estaticos
app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }))

// Parser para body do HTTP
app.use(bodyParser.json());

var holdResponse = true;
var pageBody = "";
var sendElements = [];

var currentResponse = null;

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: __dirname });
  //res.end();
});

app.post('/event', function (req, res) {
  var url = req.body.url;
  currentResponse = res;
  
  console.log("Recebi evento");
  requestPage(url);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

function selectElements(err, window){
	var $ = window.$;
	var contentToBeSent = "";
	sendElements = $("article").find(".content>p");
	
	console.log("Elementos");
	//console.log(sendElements);
	
	for(var i = 0; i < sendElements.length; i++){
		contentToBeSent += $(sendElements[i]).text();
	}
	
	writeResponse(contentToBeSent);
	endResponse();	
}

function writeResponse(content){
  currentResponse.charset = 'windows-1252';
  currentResponse.send(content);	
}

function endResponse(){
	currentResponse.end();
}


function requestPage(url){
	
	console.log("Requesting " + url);
	
	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		pageBody = body;
		
		jsdom.env({html:pageBody, scripts:["http://code.jquery.com/jquery.js"], done:selectElements});
		console.log("Page received! ");
	  }
	});
	
}