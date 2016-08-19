var http = require('http'),
    static = require('node-static'),
    WebSocketServer = require('ws').Server,
    staticServer = new static.Server('../'),
    httpSever,
    webSocketServer;

httpServer = http.createServer(accept).listen(8080);
webSocketServer = new WebSocketServer({server: httpServer});
console.log('web server created on port 8080');

function accept(request, response) {
    console.log(request.url);

    staticServer.serve(request, response);
}

webSocketServer.on('connection', function(ws) {
    ws.send('hello, client');

    ws.on('message', function (message) {
        console.log(message);
    });
});
