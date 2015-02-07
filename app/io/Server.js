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

// var _receiveMessage = function receiveMessage(messageDTO, socket) {

//   var json = JSON.parse(messageDTO);
//   var type = json.type;
//   var data = json.data;

//   logger.debug('Received event type: ', type);

//   switch (type) {

//     case MessageType.MOVE:

//       PlayerController.addActivePlayer(data, socket);

//       Message.send(socket, MessageType.MOVE_COMPLETE);

//       break;

//     case MessageType.LOGIN:

//       DatabaseController.addPlayer(data, function onAddPlayer(databaseDTO) {

//         // console.debug('databaseDTO', databaseDTO);

//         var dto = PlayerController.createLoginDTO(databaseDTO.name, databaseDTO._id);

//         Message.send(socket, MessageType.LOGIN_COMPLETE, dto);
//       });

//       break;

//     default:

//       logger.error('Event type unknown: ', type);
//   }
// };

var _onTic = function(data) {

  _.each(_socketServer.clients, function onIterateSockets(socket) {

    // Message.send(socket, MessageType.TIC, data);
  });
};

var _onBzz = function() {

  _players = PlayerController.getActivePlayers();

  if (_players.length > 0) {

    _.each(GameController.getGames(_players), function onIterateGames(game) {

      _.each(game.players, function onIteratePlayers(playerDTO) {

        if (playerDTO.socket) { // Not a dummy move

          // Message.send(playerDTO.socket, MessageType.BZZ, playerDTO.moveDTO);
        }
      });
    });

    // Clear
    PlayerController.clearActivePlayers();
  }
};

var ServerAPI = {

  move: function(data) {

    logger.info('move', data);

    var connection = ConnectionController.getConnectionById(data.connectionId);

    PlayerController.addActivePlayer(data, connection.socket);

    return true;
  },

  login: function(data) {

    logger.info('login', data);

    DatabaseController.addPlayer(data, function onAddPlayer(databaseDTO) {

      var data = PlayerController.createLoginDTO(databaseDTO.name, databaseDTO._id);

      return data;
    });
  }
};

var Server = {

  init: function(socketServer) {

    _socketServer = socketServer;

    TimeController.init(

      function onTic(data) {

        ConnectionController.getAllConnections().map(function(connection) {
          connection.remote.send({
            type: MessageType.TIC,
            data: data
          });
        });
      },

      _onBzz
    );

    ConnectionController.init(

      socketServer,

      ServerAPI,

      function onConnectionAdded(socket) {

        logger.info('onConnectionAdded');
      },

      function onConnectionRemoved(socket) {

        logger.info('onConnectionRemoved');
      },

      function onConnectionsActive(connections) {

        TimeController.start();
      },

      function onConnectionsInactive(connections) {

        TimeController.stop();
      }
    );
  }
};

module.exports = Server;