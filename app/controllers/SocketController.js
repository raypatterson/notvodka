'use strict';

var logger = require('../utils/logger')('SocketController');

var CONNECT_EVENT = 'open';
var DISCONNECT_EVENT = 'close';

var socket = require('engine.io-client')('http://localhost:8000');

var GameActions = require('../actions/GameActions');

var SocketController = function() {

  logger.debug('SocketController');

  socket.on(CONNECT_EVENT, function() {

    logger.debug(CONNECT_EVENT);

    socket.on('tic', function(data) {

      logger.debug(CONNECT_EVENT);

      // socket.emit('toc', data);

      GameActions.gameTic(data.time);
    });

    socket.on('bzz', function(data) {

      logger.debug('score', data);

      GameActions.scoreResults(data);
    });
  });

  socket.on(DISCONNECT_EVENT, function() {

    logger.debug(DISCONNECT_EVENT);
  });

  return {

    emit: function(eventType, data, cb) {

      socket.emit(eventType, data, cb);
    }
  };
};

module.exports = SocketController;