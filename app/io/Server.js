'use strict';

var logger = require('../utils/logger')('Server');

var _ = require('lodash');

var EventType = require('./Enum').EventType;
var MessageType = require('./Enum').MessageType;
var Message = require('./Message');

var ConnectionController = require('../controllers/ConnectionController');
var DatabaseController = require('../controllers/DatabaseController');
var PlayerController = require('../controllers/PlayerController');
var GameController = require('../controllers/GameController');
var TimeController = require('../controllers/TimeController');

var _players;

var ServerAPI = {

  move: function(data) {

    var connection = ConnectionController.getConnectionById(data.connectionId);

    PlayerController.addActivePlayer(data, connection);

    return true;
  },

  login: function(data) {

    logger.debug('login', data);

    DatabaseController.addPlayer(data, function onAddPlayer(databaseDTO) {

      var data = PlayerController.createLoginDTO(databaseDTO.name, databaseDTO._id);

      return data;
    });
  }
};

var Server = {

  init: function(socketServer) {

    // Timer Controller

    TimeController.init(

      function onTic(data) {

        ConnectionController.getAllConnections().map(function(connection) {

          Message.send(connection, MessageType.TIC, data);
        });
      },

      function onBzz() {

        _players = PlayerController.getActivePlayers();

        if (_players.length > 0) {

          _.each(GameController.getGames(_players), function onIterateGames(game) {

            _.each(game.players, function onIteratePlayers(player) {

              if (player.connection) { // Not a dummy move

                Message.send(player.connection, MessageType.BZZ, player.moveDTO);
              }
            });
          });

          // Clear
          PlayerController.clearActivePlayers();
        }
      }
    );

    // Connection Controller

    ConnectionController.init(

      socketServer,

      ServerAPI,

      function onConnectionAdded(socket) {

        // logger.debug('onConnectionAdded');
      },

      function onConnectionRemoved(socket) {

        // logger.debug('onConnectionRemoved');
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