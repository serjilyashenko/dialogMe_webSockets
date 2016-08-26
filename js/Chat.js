var Chat = (function () {
    var Chat = function (url, id, form, pane) {
        this.id = id;
        this.pane = pane;
        this.form = form;

        this.initWebSocket(url);
    };

    Chat.prototype.initWebSocket = function (url) {
        var self = this,
            ws = new WebSocket(url);

        ws.onopen = function () {
            console.log('websocket opened ...');
            self.initForm(this);
        };

        ws.onclose = function () {
            console.log('websocket closed');
            setTimeout(function () {
                self.initWebSocket(url);
            }, 2000);
        };

        ws.onmessage = function (event) {
            
            self.addMessage(event.data);
        };
    };

    Chat.prototype.initForm = function (ws) {
        var self = this;
        this.form.onsubmit = function () {
            var messageElement = this.message;
            if (messageElement.value) {
                var data = JSON.stringify({'id': self.id, 'message': messageElement.value});
                ws.send(data);
                messageElement.value = '';
            }
            return false;
        };
    };

    Chat.prototype.addMessage = function (data) {
        var messageElement = document.createElement('div'),
            data = JSON.parse(data),
            stringToPublish =  data.id + ': ' + data.message;
        messageElement.appendChild(document.createTextNode(stringToPublish));
        this.pane.appendChild(messageElement);
    };
    
    return Chat;
}());
