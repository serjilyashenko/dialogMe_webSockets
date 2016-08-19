var http = require('http'),
    httpSever;

httpServer = http.createServer(accept).listen(8080);
console.log('web server created on port 8080');

function accept(request, response) {
    console.log(request.url);
}
