'use strict';
const exec = require('child_process').exec;

let querystring = require('querystring');
    fs = require('fs');
    formidable = require('formidable');

function start(res) {
  console.log('request handler "start" was called');

  var body = '<html>' +
  '<head>' +
  '<meta http-equiv="Content-Type" content="text/html; '+
  'charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload" enctype="multipart/form-data" method="post">'+
  '<input type="file" name="upload" multiple="multiple">'+
  '<input type="submit" value="Upload file" />'+
  '</form>'+
  '</body>'+
  '</html>';

  res.writeHead(200, {"Content-Type": "text/plain"})
  res.write(body)
  res.end();
}

function upload(res, req) {
  console.log('request handler "upload" was called');
  let form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(req, function(err, fields, files){
    console.log('parsing done');

    fs.rename(files.upload.path, (__dirname +'/tmp/test.png'), function(error){
      if(err){
        fs.unlink(__dirname + '/tmp/test.png');
        fs.rename(files.upload.path, (__dirname + '/tmp/test.png'));
      }
    });
    res.writeHead(200, {"Content-Type": "text/plain"})

    res.write('received image:<br/>');
    res.write('<img  src="/show" />')
    res.end();
  });
}

function show(res) {
  console.log('request handler "show" was called.');
  res.writeHead(200, {'Content-Type': 'image/png'});
  fs.createReadStream(__dirname + '/tmp/test.png').pipe(res);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
