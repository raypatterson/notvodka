var GameController = require('./GameController');
var PlayerController = require('./PlayerController');
var MoveController = require('./MoveController');

var _state = {
  games: [],
  players: [],
  moves: []
};

var ArenaController = {

  getState: function() {

    return _state;
  },

  addMove: function(moveType) {

    _state.moves.push(MoveController.getMoveByType(moveType));

    return _state;
  }
};

module.exports = ArenaController;