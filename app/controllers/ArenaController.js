'use strict';

var _ = require('lodash');

var ConnectionController = require('./ConnectionController');
var TimeController = require('./TimeController');
var DatabaseController = require('./DatabaseController');
var GameController = require('./GameController');
var PlayerController = require('./PlayerController');
var MoveController = require('./MoveController');
var DataController = require('./DataController');

var _players;
var _io; // Socket.io

var _onTic = function(data) {
  _io.emit('tic', data);
};

var _onBzz = function() {

  _players = PlayerController.getActivePlayers();

  if (_players.length > 0) {

    _.each(GameController.getGames(_players), function(game) {

      _.each(game.players, function(playerDTO) {

        if (playerDTO.socket) { // Not a dummy move

          playerDTO.socket.emit('bzz', playerDTO.moveDTO);
        }
      });
    });

    // Clear
    PlayerController.clearActivePlayers();
  }
};

var _onConnectionAdded = function(connections) {

  TimeController.start();
};

var _onConnectionRemoved = function(connections) {

  TimeController.stop();
};

var ArenaController = {

  init: function(io) {

    _io = io;

    TimeController.init(_onTic, _onBzz);

    ConnectionController.init(_onConnectionAdded, _onConnectionRemoved);
  },

  getInitialStateAsync: function(cb) {

    DatabaseController.getInitialStateAsync(function(state) {

      state.isGamePlayed = false;
      state.isGameComplete = false;
      state.player = PlayerController.getPlayer();
      state.potentialMoves = MoveController.MOVE_LIST;

      cb(state);
    });
  },

  addPlayerClientSocket: function(socket) {

    ConnectionController.add();

    socket.on('move', function(dto, cb) {

      console.log('dto', dto);

      PlayerController.addActivePlayer(dto, socket);

      cb(dto);
    });

    socket.on('login', function(dto, cb) {

      console.log('dto', dto);

      cb(dto);
    });
  },

  removePlayerClientSocket: function(socket) {

    ConnectionController.remove();

    socket.removeAllListeners();
  }
};

module.exports = ArenaController;