var Chat = (function () {
    var Chat = function (url, id, form, pane) {
        var ws = new WebSocket(url);

        ws.onopen = function () {
            var self = this;
            form.onsubmit = function () {
                var messageElement = form.message;

                if (messageElement.value) {
                    var data = JSON.stringify({'id': id, 'message': messageElement.value});
                    self.send(data);
                    messageElement.value = '';
                }

                return false;
            };
        };

        ws.onclose = function () {
        //    TODO: reopen webSocket
        }

        ws.onmessage = function (event) {
            addMessage(event.data, pane);
        };

    };

    function addMessage (message, pane) {
        var messageElement = document.createElement('div');
        messageElement.appendChild(document.createTextNode(message));
        pane.appendChild(messageElement);
    }
    
    return Chat;
}());
