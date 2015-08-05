var querystring = require('querystring'),
	fs = require('fs'),
	formidable = require('formidable');

function start(req,res){
	var body = '<html>'+'<head>'+'<body>'+'<form action="/upload" method="post" enctype="multipart/form-data">'+'<input type="file" name="upload" />'+
       '<input type="submit" value="submit"/>'+'</form></body></html>';
   
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(body);
    res.end();
}

function upload(req,res){

	var form = new formidable.IncomingForm();
	form.uploadDir = "./tmp"
	form.parse(req,function(error,fields,files){
		setTimeout(function(){
		    try{
		        fs.renameSync(files.upload.path,"./tmp/test.png")
			    }catch(e){
			        console.log(e);
			    }

			//fs.renameSync(files.upload.path,"C:\\tmp\test.png");
			res.writeHead(200,{"Content-Type":"text/html"});
			res.write('<image src="./show">');
			res.end();
		},5000);
	});
}

function show(req,res,postData){
	fs.readFile("./tmp/test.png","binary",function(error,file){
		if(error){
			res.writeHead(500,{"Content-Type":"text/plain"});
			res.write(error+"\n");
			res.end();
		}else{
			res.writeHead(200,{"Content-Type":"image/png"});
			res.write(file,"binary");
			res.end();
		}
	});
}

exports.upload = upload;
exports.start = start;
exports.show = show;