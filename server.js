'use strict'

const http = require('http');
const url = require('url');

function start(route, handle) {
function onRequest(req,res) {
  let pathname = url.parse(req.url).pathname;
  console.log('request for ' + pathname + ' received')

  route(handle,pathname,response);
  // res.writeHead(200, {"Content-Type": "text/plain"})
  // let content = route(handle,pathname)
  // res.write('Hello World')
  // res.end();

}

http.createServer(onRequest).listen(3000);
console.log('server has started');
}

exports.start = start;
