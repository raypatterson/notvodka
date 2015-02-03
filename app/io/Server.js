'use strict';

var logger = require('../utils/logger')('Server');

var EventType = require('./Enum').EventType;
var MessageType = require('./Enum').MessageType;
var Message = require('./Message');

var _ = require('lodash');

var ConnectionController = require('../controllers/ConnectionController');
var DatabaseController = require('../controllers/DatabaseController');
var PlayerController = require('../controllers/PlayerController');
var GameController = require('../controllers/GameController');
var TimeController = require('../controllers/TimeController');

var _players;
var _socketServer;

var _receiveMessage = function receiveMessage(messageDTO, socket) {

  var json = JSON.parse(messageDTO);
  var type = json.type;
  var data = json.data;

  logger.debug('Received event type: ', type);

  switch (type) {

    case MessageType.MOVE:

      PlayerController.addActivePlayer(data, socket);

      Message.send(socket, MessageType.MOVE_COMPLETE);

      break;

    case MessageType.LOGIN:

      DatabaseController.addPlayer(data, function onAddPlayer(databaseDTO) {

        // console.debug('databaseDTO', databaseDTO);

        var dto = PlayerController.createLoginDTO(databaseDTO.name, databaseDTO._id);

        Message.send(socket, MessageType.LOGIN_COMPLETE, dto);
      });

      break;

    default:

      logger.error('Event type unknown: ', type);
  }
};

var _onTic = function(data) {

  _.each(_socketServer.clients, function onIterateSockets(socket) {

    Message.send(socket, MessageType.TIC, data);
  });
};

var _onBzz = function() {

  _players = PlayerController.getActivePlayers();

  if (_players.length > 0) {

    _.each(GameController.getGames(_players), function onIterateGames(game) {

      _.each(game.players, function onIteratePlayers(playerDTO) {

        if (playerDTO.socket) { // Not a dummy move

          Message.send(playerDTO.socket, MessageType.BZZ, playerDTO.moveDTO);
        }
      });
    });

    // Clear
    PlayerController.clearActivePlayers();
  }
};

var _addPlayerClientSocket = function addPlayerClientSocket(socket) {

  ConnectionController.add();

  socket.on(EventType.MESSAGE, function message(messageDTO) {

    _receiveMessage(messageDTO, socket);
  });
};

var _removePlayerClientSocket = function _removePlayerClientSocket(socket) {

  ConnectionController.remove();

  socket.removeAllListeners();
};

var Server = {

  init: function(socketServer) {

    _socketServer = socketServer;

    socketServer.on(EventType.CONNECT, function connection(socket) {

      logger.info(EventType.CONNECT);

      _addPlayerClientSocket(socket);

      socket.on(EventType.DISCONNECT, function close() {

        logger.info(EventType.DISCONNECT);

        _removePlayerClientSocket(socket);
      });
    });

    TimeController.init(_onTic, _onBzz);

    ConnectionController.init(

      function onConnectionAdded(connections) {

        TimeController.start();
      },

      function onConnectionRemoved(connections) {

        TimeController.stop();
      }
    );
  }
};

module.exports = Server;