var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var jsdom = require('jsdom');
var encoding = require("encoding");
var windows1252 = require('windows-1252');

var app = express();

var holdResponse = true;
var pageBody = "";
var sendElements = [];

var currentResponse = null;

var currentURL = "";

// Objeto para diferenciar os padroes HTML de acordo com o dominio do artigo
var htmlPatterns = {
	"folha.uol.com.br": "article>.content>p",
	"uol.com.br": "article>header>h1:not(div), article>#texto>p, article>#texto>h3",
	"estadao.com.br":"h2.titulo-principal, div.content>p",
	".":"article"
};

// Arquivos estaticos
app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }))

// Parser para body do HTTP
app.use(bodyParser.json());

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
	var possibleURLs = Object.keys(htmlPatterns);
	var key = "";
	
	for(var i = 0; i < possibleURLs.length; i++){
		key = possibleURLs[i];
		if(currentURL.indexOf(key) >= 0)
		{
			sendElements = $(htmlPatterns[key]);
			break;
		}
		
	}

	for(var i = 0; i < sendElements.length; i++){
		contentToBeSent += $(sendElements[i]).text(); + ";"
	}
	
	contentToBeSent = windows1252.decode(contentToBeSent);
	
	//console.log(contentToBeSent);
	
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
	currentURL = url;
	
	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		pageBody = body;
		
		jsdom.env({html:pageBody, scripts:["http://code.jquery.com/jquery.js"], done:selectElements});
		console.log("Page received! ");
	  }
	});
	
}