var TimeController = require('./TimeController');
var DatabaseController = require('./DatabaseController');
var GameController = require('./GameController');
var PlayerController = require('./PlayerController');
var MoveController = require('./MoveController');

var _players = 0;
var _io;

var _emitSocketEvent = function(eventType, data) {
  _io.emit(eventType, data);
};

var ArenaController = {

  init: function(io) {
    console.log('ArenaController.init');
    _io = io;
  },

  getInitialStateAsync: function(cb) {

    DatabaseController.getInitialStateAsync(function(state) {

      state.player = PlayerController.getPlayer();
      state.potentialMoves = MoveController.MOVE_LIST;

      cb(state);
    });
  },

  addPlayerClientSocket: function(socket) {

    if (_players++ === 0) {

      TimeController.start(_emitSocketEvent);
    }

    console.log('Player ' + socket.id + ' connected');
    console.log(_players + ' player(s) connected');

    socket.on('move', function(data) {
      console.log('socket id', socket.id);
      console.log('move type', data.moveType);
      console.log('from player', data.playerId);
    });
  },

  removePlayerClientSocket: function(socket) {

    if (--_players === 0) {

      TimeController.stop();
    }

    socket.removeAllListeners();

    console.log('Player ' + socket.id + ' disconnected');
    console.log(_players + ' player(s) connected');
  },

  getPlayerMove: function(playerId, moveType) {

    var move = MoveController.getMoveByType(moveType);

    var game = GameController.getGame();

    return {
      move: move,
      game: game
    };
  }
};

module.exports = ArenaController;