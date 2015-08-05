var http = require('http');
var router = require('../router/router');

function serverStart(){
	http.createServer(function(req,res){	
		router.route(req,res);
	}).listen(80,'127.0.0.1'); 

}

exports.serverStart = serverStart;