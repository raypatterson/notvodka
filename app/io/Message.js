module.exports = {

  send: function send(socket, messageType, messageData, shouldCallback) {

    socket.send(JSON.stringify({
      type: messageType,
      data: messageData,
      shouldCallback: typeof shouldCallback === 'function' ? true : false
    }));
  },

  receive: function receive() {

  }
};