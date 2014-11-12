var DatabaseController = require('./DatabaseController');
var GameController = require('./GameController');
var PlayerController = require('./PlayerController');
var MoveController = require('./MoveController');

var ArenaController = {

  getInitialStateAsync: function(cb) {

    DatabaseController.getInitialStateAsync(function(state) {

      state.player = PlayerController.getPlayer();
      state.potentialMoves = MoveController.MOVE_LIST;

      cb(state);
    });
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