'use strict';

var logger = require('../utils/logger')('Server');

var _ = require('lodash');

var EventType = require('./Enum').EventType;
var MessageType = require('./Enum').MessageType;
var Message = require('./Message');

var ServerApi = require('./ServerApi');

var ConnectionController = require('../controllers/ConnectionController');
var PlayerController = require('../controllers/PlayerController');
var GameController = require('../controllers/GameController');
var TimeController = require('../controllers/TimeController');

var Server = {

  init: function(socketServer) {

    TimeController.init(

      function onTic(data) {

        ConnectionController.getAllConnections().map(function(connection) {

          Message.send(connection, MessageType.TIC, data);
        });
      },

      function onBzz() {

        GameController.getGames(PlayerController.getActivePlayers()).map(function onIterateGames(game) {

          game.players.map(function onIteratePlayers(player) {

            if (player.connection) { // Not a dummy move

              Message.send(player.connection, MessageType.BZZ, player.moveDTO);
            }
          });
        });

        PlayerController.clearActivePlayers();
      }
    );

    ConnectionController.init(

      socketServer,

      ServerApi, // Has methods the clients can access

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