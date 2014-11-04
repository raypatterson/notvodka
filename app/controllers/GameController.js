var Firebase = require('firebase');
var fb = new Firebase('https://isitvodka.firebaseio.com/');
var fbGames = fb.child('games');

var PlayerController = require('./PlayerController');
var MoveController = require('./MoveController');

var PLAYER_LIMIT = 3;
var MOVE_TIMEOUT = 1000 * 5;

var _activeGames = [];

var _checkGameStatus = function(game) {
  console.log('Check Game Status', game);

  // Check for any player moves

};

var _setGameTimer = function(game) {

  console.log('Set Game Timer');

  game.timer = setTimeout(function() {
    clearTimeout(game.timer);
    _checkGameStatus(game);
  }, MOVE_TIMEOUT);
}

var _getNewGame = function() {

  console.log('Get New Game');

  var game = {
    _id: Date.now(),
    correctMove: MoveController.getRandomMove(),
    players: []
  };

  _activeGames.push(game);

  return game;
};

var _getActiveGame = function() {

  console.log('Get Active Game');

  var i, game;

  for (i in _activeGames) {
    game = _activeGames[i];
    if (game.players.length < PLAYER_LIMIT) {
      return game;
    }
  };

  return _getNewGame();
};

var _getGame = function() {

  console.log('Get Game');

  var game = _activeGames.length === 0 ? _getNewGame() : _getActiveGame();

  _setGameTimer(game);

  return game;
};

var _setOnceEventHandler = function(ref, cb) {

  ref.once('value', function(state) {

    cb(state.val());

  }, function(error) {

    console.log('WUHWUHWUHwuhwuh wuh wuh  wuh  wuh  wuuuuuhhhhh' + error.code);
  });
};

var GameController = {

  getInitialState: function(cb) {

    _setOnceEventHandler(fb, cb);
  },

  addGame: function(game, cb) {

    console.log('GameController.addGame', game);

    _setOnceEventHandler(fbGames, cb);

    fbGames.push(game);
  },

  getGame: function(moveType) {

    var playerMove = MoveController.getMoveByType(moveType);
    var correctMove = MoveController.getRandomMove();
    var opponentMoves = [MoveController.getRandomMove(), MoveController.getRandomMove()];
    var isWonByGuessing = PlayerController.getHasWonByGuessing(playerMove, correctMove);
    var isWonByDisagreeing = PlayerController.getHasWonByDisagreeing(playerMove, opponentMoves);

    return {

      _id: Date.now(),
      playerMove: playerMove,
      correctMove: correctMove,
      opponentMoves: opponentMoves,
      isWonByGuessing: isWonByGuessing,
      isWonByDisagreeing: isWonByDisagreeing
    };
  },

  getGame2: function() {

    _activeGames.push(_getNewGame());

    return _getGame();
  }
};

module.exports = GameController;