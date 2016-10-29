var Chat = (function () {
    var Chat = function (url, id, form, pane) {
        this.id = id;
        this.pane = pane;
        this.form = form;
        this.ws = null;

        this.initWebSocket(url);
        this.initForm();
    };

    Chat.prototype.initWebSocket = function (url) {
        var self = this,
            ws = new WebSocket(url);

        ws.onopen = function () {
            console.log('websocket opened ...');
            self.addBotMessage('Connected');
            self.publish('Joined the Chat');
        };

        ws.onclose = function () {
            console.log('websocket closed');
            self.addBotMessage('Server Offline');
            self.ws = null;

            setTimeout(function () {
                self.initWebSocket(url);
            }, 2000);
        };

        ws.onmessage = function (event) {
            var data = JSON.parse(event.data),
                message =  data.id + ': ' + data.message;

            self.addMessage(message);
        };

        this.ws = ws;
    };

    Chat.prototype.initForm = function () {
        var self = this;
        this.form.onsubmit = function () {
            var messageElement = this.message;
            if (messageElement.value) {
                self.publish(messageElement.value);
                messageElement.value = '';
            }
            return false;
        };
    };

    Chat.prototype.addMessage = function (message) {
        var messageElement = document.createElement('div');

        messageElement.appendChild(document.createTextNode(message));
        this.pane.appendChild(messageElement);
    };

    Chat.prototype.addBotMessage = function (message) {
        var newDate = new Date(),
            date = newDate.getHours() + ':' + newDate.getMinutes();
        if (message !== this._lastBotMessage) {
            this.addMessage('Chat Bot : ' + message +  ' at ' + date);
        }
        this._lastBotMessage = message;
    };

    Chat.prototype.publish = function (message) {
        var data;

        if (!this.ws) {
            return;
        }

        data = JSON.stringify({'id': this.id, 'message': message});
        this.ws.send(data);
    };
    
    return Chat;
}());
