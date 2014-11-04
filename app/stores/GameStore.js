var Reflux = require('reflux');
var _ = require('lodash');

var GameController = require('../controllers/GameController');
var MoveController = require('../controllers/MoveController');

var _state = {
  games: [], // Stored in Firebase
  activeGame: undefined,
  isGameActive: false,
  isGamePlayed: false,
  potentialMoves: MoveController.MOVE_LIST
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

  onPlayGame: function(moveType) {

    var game = GameController.getGame2();

    console.log('game', game);

    _state.activeGame = GameController.getGame(moveType);

    _state.isGameActive = false;
    _state.isGamePlayed = true;

    this.trigger(_state);
  }
});

module.exports = GameStore;