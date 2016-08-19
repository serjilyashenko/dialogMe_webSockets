var Chat = (function () {
    var Chat = function (url) {
        var ws = new WebSocket(url);

        ws.onmessage = function (event) {
            console.log(event.data);
            ws.send('hello, server');
        };
    };
    
    return Chat;
}());
