'use strict';
const exec = require('child_process').exec;

function start(response) {
  console.log('request handler "start" was called');


  exec('ls -lah', function(err,stdout,stderr) {
    res.writeHead(200, {"Content-Type": "text/plain"})
    res.write(stdout)
    res.end();

  })
  return content;
}

function upload(response) {
  console.log('request handler "upload" was called');
  res.writeHead(200, {"Content-Type": "text/plain"})
  let content = route(handle,pathname)
  res.write('Hello upload')
  res.end();

}

exports.start = start;
exports.upload = upload;
