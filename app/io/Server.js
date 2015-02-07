'use strict';

var logger = require('../utils/logger')('Server');

var _ = require('lodash');

var EventType = require('./Enum').EventType;
var MessageType = require('./Enum').MessageType;
var Message = require('./Message');

var ServerApi = require('./ServerApi');

var ConnectionController = require('../controllers/ConnectionController');
var DatabaseController = require('../controllers/DatabaseController');
var PlayerController = require('../controllers/PlayerController');
var GameController = require('../controllers/GameController');
var TimeController = require('../controllers/TimeController');

var _players;

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

      // Has methods the clients can access
      ServerApi,

      function onConnectionAdded(connection) {

        // logger.debug('onConnectionAdded:', connection);
      },

      function onConnectionRemoved(connection) {

        // logger.debug('onConnectionRemoved:', connection);
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