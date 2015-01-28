'use strict';

var logger = require('./app/utils/logger')('sockets');

var CONNECT_EVENT = 'connection';
var DISCONNECT_EVENT = 'close';

var ArenaController = require('./app/controllers/ArenaController');
var TimeController = require('./app/controllers/TimeController');

var Sockets = function(io) {

  logger.info('Sockets');

  ArenaController.init(io);

  io.on(CONNECT_EVENT, function(socket) {

    logger.info(CONNECT_EVENT);

    ArenaController.addPlayerClientSocket(socket);

    socket.on(DISCONNECT_EVENT, function() {

      ArenaController.removePlayerClientSocket(socket);
    });
  });
};

module.exports = Sockets;