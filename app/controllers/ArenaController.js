'use strict';

var _ = require('lodash');

var TimeController = require('./TimeController');
var DatabaseController = require('./DatabaseController');
var GameController = require('./GameController');
var PlayerController = require('./PlayerController');
var MoveController = require('./MoveController');
var DataController = require('./DataController');


var _connected = 0;
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

var _checkConnection = function(connected) {

  _connected = connected;

  if (_connected === 0) {

    TimeController.start(_onTic, _onBzz);

  } else {

    TimeController.stop();
  }
};

var ArenaController = {

  init: function(io) {
    _io = io;
  },

  getInitialStateAsync: function(cb) {

    DatabaseController.getInitialStateAsync(function(state) {

      state.isGamePlayed = false;
      state.player = PlayerController.getPlayer();
      state.potentialMoves = MoveController.MOVE_LIST;

      cb(state);
    });
  },

  addPlayerClientSocket: function(socket) {

    _checkConnection(_connected++);

    if (_connected++ === 0) {

      TimeController.start(_onTic, _onBzz);
    }

    console.log('Player ' + socket.id + ' connected');
    console.log(_connected + ' player(s) connected');

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

    if (--_connected === 0) {

      TimeController.stop();
    }

    socket.removeAllListeners();

    console.log('Player ' + socket.id + ' disconnected');
    console.log(_connected + ' player(s) connected');
  }
};

module.exports = ArenaController;