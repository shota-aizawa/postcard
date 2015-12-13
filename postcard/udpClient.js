var PORT = 33333;
var HOST = '192.168.1.07';

var dgram = require('dgram');
var prompt = require('prompt');
prompt.start();
var bool = 0;
var client = dgram.createSocket('udp4');
var clientName = "";

clientPrompt();

function clientPrompt(){
	prompt.get(['clientName'], function (err, result){
		clientName = result.clientName;
		sendMessage();
	});
}

function sendMessage(){
	prompet.get(['newMessage'], function(err,result){
		message = new Buffer(clientName + "," + result.newMessage);
		client.send(message, 0, message.length, PORT, HOST, function(err,bytes){
			if(err) throw err;
			console.log('UDP message sent to ' + HOST + ':' + PORT);
			sendMessage();
		});
	});
}