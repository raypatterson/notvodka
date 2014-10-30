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

var _getIsGameWonByGuessing = function(playerMove) {

  return playerMove._id === _state.activeGame.correctMove._id ? true : false;
};

var _getIsGameWonByDisagreeing = function(playerMove) {

  return !_.contains(_state.activeGame.opponentMoves, playerMove);
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

    _state.activeGame = {
      _id: Date.now(),
      correctMove: _getRandomMove(),
      playerMove: undefined,
      opponentMoves: [_getRandomMove(), _getRandomMove()]
    };

    this.trigger(_state);
  },

  onPlayGame: function(moveId) {

    _state.isGameActive = false;
    _state.isGamePlayed = true;

    _state.activeGame.playerMove = _getMoveFromId(moveId);

    _state.isGameWonByGuessing = _getIsGameWonByGuessing(_state.activeGame.playerMove);
    _state.isGameWonByDisagreeing = _getIsGameWonByDisagreeing(_state.activeGame.playerMove);

    this.trigger(_state);
  }
});

module.exports = GameStore;