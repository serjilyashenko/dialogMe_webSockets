var http = require('http'),
    static = require('node-static'),
    staticServer = new static.Server('../'),
    httpSever;

httpServer = http.createServer(accept).listen(8080);
console.log('web server created on port 8080');

function accept(request, response) {
    console.log(request.url);

    staticServer.serve(request, response);
}
