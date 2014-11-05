var Firebase = require('firebase');
var fb = new Firebase('https://isitvodka.firebaseio.com/');
var fbGames = fb.child('games');

var GameActions = require('../actions/GameActions');

var PlayerController = require('./PlayerController');
var MoveController = require('./MoveController');

var OPPONENT_MOVE_LIMIT = 3;
var MOVE_TIME_INTERVAL = 50;
var MOVE_TIME_LIMIT = 1000 * 5;

var _state = {};
var _activeGames = [];

var _checkGameStatus = function(game) {

  console.log('Check Game Status');

  if (_state.isGamePlayed) {

    console.log('_state', _state);

    _state.activeGame.opponentMoves.push(MoveController.getRandomMove());
    _state.activeGame.opponentMoves.push(MoveController.getRandomMove());

    _state.isGameComplete = true;

    GameActions.scoreGame(_state);

  } else {

    game.correctMove = MoveController.getRandomMove();

    GameActions.checkGame(_state);

    _setGameTimer(game);
  }
};

var _setGameTimer = function(game) {

  console.log('Set Game Timer');

  game.elapse = 0;
  game.progress = 0;

  game.timer = setInterval(function() {

    if (game.elapse < MOVE_TIME_LIMIT) {

      game.elapse += MOVE_TIME_INTERVAL;
      game.progress = game.elapse / MOVE_TIME_LIMIT;
      game.secondsRemaining = Math.floor((MOVE_TIME_LIMIT - game.elapse) / 1000) + 1;

      GameActions.checkGame(_state);

    } else {

      clearInterval(game.timer);

      _checkGameStatus(game);
    }
  }, MOVE_TIME_INTERVAL);
}

var _getNewGame = function() {

  console.log('Get New Game');

  var game = {
    _id: Date.now(),
    correctMove: MoveController.getRandomMove(),
    opponentMoves: []
  };

  _activeGames.push(game);

  return game;
};

var _getActiveGame = function() {

  console.log('Get Active Game');

  var i, game;

  for (i in _activeGames) {
    game = _activeGames[i];
    if (game.opponentMoves.length < OPPONENT_MOVE_LIMIT) {
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

var GameController = {

  setInitialState: function(state) {

    _state = {
      games: state.games || [], // From Firebase
      activeGame: _getGame(),
      isGameActive: false,
      isGamePlayed: false,
      isGameComplete: false,
      potentialMoves: MoveController.MOVE_LIST,
      player: PlayerController.getPlayer()
    };

    GameActions.initGame(_state);
  },

  getState: function() {

    return _state;
  },

  updatePlayerMove: function(moveType) {

    _state.player.move = MoveController.getMoveByType(moveType);
    _state.isGamePlayed = true;

    return _state;
  }
};

module.exports = GameController;