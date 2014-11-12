var io = require('socket.io-client');
var socket = io('http://localhost');

var GameActions = require('../actions/GameActions');

var SocketController = function(window) {

  socket.on('connect', function() {

    console.log('Client Connect');

    socket.on('tic', function(data) {

      console.log('tic', data);

      // socket.emit('toc', data);

      GameActions.time(data.time);
    });
  });
};

module.exports = SocketController;