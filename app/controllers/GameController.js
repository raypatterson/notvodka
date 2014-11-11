var request = require('superagent');

var GameActions = require('../actions/GameActions');

var PlayerController = require('./PlayerController');
var MoveController = require('./MoveController');

var _state = {};
var _activeGames = [];

var OPPONENT_MOVE_LIMIT = 2;

// var _checkGameStatus = function(game) {

//   // console.log('Check Game Status');

//   if (_state.isGamePlayed) {

//     console.log('_state', _state);

//     _state.activeGame.opponentMoves.push(MoveController.getRandomMove());
//     _state.activeGame.opponentMoves.push(MoveController.getRandomMove());

//     _state.isGameComplete = true;

//     GameActions.scoreGame(_state);

//   } else {

//     game.correctMove = MoveController.getRandomMove();

//     GameActions.checkGame(_state);

//     _setGameTimer(game);
//   }
// };

var _connectGameTic = function() {

  console.log('GameController._connectGameTic()');

  // socket.on('connect', function() {
  //   console.log('connect');
  //   socket.on('tic', function(data) {
  //     console.log('tic', data);
  //     socket.emit('toc', {
  //       time: data
  //     });

  //     _state.activeGame.time = data.time;

  //     GameActions.checkGame(_state);
  //   });
  // });
};

var _getNewGame = function() {

  var game = {
    _id: Date.now(),
    correctMove: MoveController.getRandomMove(),
    opponentMoves: []
  };

  _activeGames.push(game);

  return game;
};

var _getActiveGame = function() {

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

  _connectGameTic();

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

  updateGameTime: function(time) {

    _state.activeGame.time = time;

    GameActions.checkGame(_state);
  },

  updatePlayerMove: function(moveType) {

    // _state.player.move = MoveController.getMoveByType(moveType);
    // _state.isGamePlayed = true;

    request
      .post('api/move')
      .send({
        moveType: moveType
      })
      .set('Accept', 'application/json')
      .end(function(error, res) {
        console.log('res', res);
      });

    return _state;
  }
};

module.exports = GameController;