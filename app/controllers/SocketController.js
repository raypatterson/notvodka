'use strict';

var io = require('socket.io-client');
var socket = io('http://localhost');

var GameActions = require('../actions/GameActions');

var SocketController = function() {

  socket.on('connect', function() {

    socket.on('tic', function(data) {

      // socket.emit('toc', data);

      GameActions.gameTic(data.time);
    });

    socket.on('bzz', function(data) {

      console.log('score', data);

      GameActions.scoreResults(data);
    });
  });

  return {

    emit: function(eventType, data, cb) {

      socket.emit(eventType, data, cb);
    }
  };
};

module.exports = SocketController;