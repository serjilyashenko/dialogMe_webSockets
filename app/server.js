var http = require('http'),
    static = require('node-static'),
    WebSocketServer = require('ws').Server,
    staticServer = new static.Server('../'),
    httpServer,
    webSocketServer,
    subscribers = {};

httpServer = http.createServer(initHttpServer).listen(8080);
webSocketServer = new WebSocketServer({server: httpServer});
webSocketServer.on('connection', initWebSocketServer);
console.log('web server created on port 8080');

function initHttpServer(request, response) {
    console.log(request.url);
    staticServer.serve(request, response);
}

function initWebSocketServer(ws) {
    var id = Math.random();

    subscribers[id] = ws;

    ws.on('message', function (data) {
        var jsonData = JSON.parse(data),
            message = jsonData.id + ': ' + jsonData.message;

        console.log(message);
        publish(message);
    });

    ws.on('close', function () {
        console.log('undescribed');
        delete subscribers[id];
        console.log(subscribers);
    });
}

function publish (message) {
    var id;
    for (id in subscribers) {
        subscribers[id].send(message);
    }
    console.log(Object.keys(subscribers));
}
