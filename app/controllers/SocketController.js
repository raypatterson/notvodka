var io = require('socket.io-client');
var socket = io('http://localhost');

var GameController = require('./GameController');

var SocketController = function(window) {

  socket.on('connect', function() {

    console.log('Client Connect');

    socket.on('tic', function(data) {

      console.log('tic', data);

      // socket.emit('toc', data);

      GameController.updateGameTime(data.time);
    });
  });
};

module.exports = SocketController;