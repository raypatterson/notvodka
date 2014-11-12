var PlayerController = require('./PlayerController');
var MoveController = require('./MoveController');

_games = [];

var _getNew = function() {

  var game = {
    _id: Date.now(),
    correctMove: MoveController.getRandomMove(),
    playerMoves: []
  };

  _games.push(game);

  return game;
};

var _getActive = function() {

  var i, game;

  for (i in _games) {
    game = _games[i];
    if (game.playerMoves.length < 3) {
      return game;
    }
  };

  return _getNew();
};

var GameController = {

  getGame: function() {

    return _games.length === 0 ? _getNew() : _getActive();
  }
};

module.exports = GameController;