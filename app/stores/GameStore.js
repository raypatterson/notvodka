var Reflux = require('reflux');
var _ = require('lodash');

var GameController = require('../controllers/GameController');

var _state = {
  games: [], // Stored in Firebase
  activeGame: undefined,
  isGameActive: false,
  isGamePlayed: false,
  isGameWonByDisagreeing: false,
  isGameWonByGuessing: false,
  potentialMoves: [{
    _id: '0',
    title: 'Yes'
  }, {
    _id: '1',
    title: 'No'
  }]
};

// var _games = [];

var _getRandomMove = function() {

  return _state.potentialMoves[Math.floor(Math.random() * _state.potentialMoves.length)];
};

var _getMoveFromId = function(id) {

  return _.find(_state.potentialMoves, function(move) {
    return move._id === id;
  });
};

var _getIsWonByGuessing = function(playerMove, correctMove) {

  return playerMove._id === correctMove._id ? true : false;
};

var _getIsWonByDisagreeing = function(playerMove, opponentMoves) {

  return !_.contains(opponentMoves, playerMove);
};

var GameStore = Reflux.createStore({

  listenables: require('../actions/GameActions'),

  getInitialState: function() {

    return _state;
  },

  setInitialState: function(games) {

    // Storing list of 'games' for now
    _state.games = games || [];

    this.trigger(_state);
  },

  addGame: function(game) {

    var self = this;

    GameController.addGame(game, function(games) {

      _state.games = games;

      self.trigger(_state);
    });
  },

  onStartGame: function() {

    if (_state.activeGame) {

      this.addGame(_state.activeGame);
    }

    _state.isGameActive = true;
    _state.isGamePlayed = false;

    this.trigger(_state);
  },

  onPlayGame: function(moveId) {

    _state.isGameActive = false;
    _state.isGamePlayed = true;

    var playerMove = _getMoveFromId(moveId);
    var correctMove = _getRandomMove();
    var opponentMoves = [_getRandomMove(), _getRandomMove()];
    var isWonByGuessing = _getIsWonByGuessing(playerMove, correctMove);
    var isWonByDisagreeing = _getIsWonByDisagreeing(playerMove, opponentMoves);

    _state.activeGame = {
      _id: Date.now(),
      playerMove: playerMove,
      correctMove: correctMove,
      opponentMoves: opponentMoves,
      isWonByGuessing: isWonByGuessing,
      isWonByDisagreeing: isWonByDisagreeing
    };

    this.trigger(_state);
  }
});

module.exports = GameStore;