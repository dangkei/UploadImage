var url = require('url');
var requestHandlers = require('../router/requestHandlers');

var handler = {};

handler['/'] = requestHandlers.start;
handler['/start'] = requestHandlers.start;
handler['/upload'] = requestHandlers.upload;
handler['/show'] =  requestHandlers.show;

function route(req,res){

	var pathname = url.parse(req.url).pathname;
		
	if (typeof handler[pathname]==='function') {		
		return handler[pathname](req,res);
	}else{
		res.writeHead(404,{"Content-Type":"text/html"});
		res.write('<h1>Not found page!</h1>');
		res.end('');
	}
}

exports.route = route;