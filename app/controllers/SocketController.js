var io = require('socket.io-client');
var socket = io('http://localhost');

var GameActions = require('../actions/GameActions');

var SocketController = function() {

  socket.on('connect', function() {

    socket.on('tic', function(data) {

      // console.log('tic', data);

      // socket.emit('toc', data);

      GameActions.time(data.time);
    });
  });

  return {

    emit: function(eventType, data) {

      socket.emit(eventType, data);
    }
  };
};

module.exports = SocketController;