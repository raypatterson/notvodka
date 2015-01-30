module.exports = {

  send: function send(socket, type, data) {

    socket.send(JSON.stringify({
      type: type,
      data: data
    }));
  },

  receive: function receive() {

  }
};