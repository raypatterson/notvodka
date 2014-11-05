var Reflux = require('reflux');
var _ = require('lodash');

var GameController = require('../controllers/GameController');
var PlayerController = require('../controllers/PlayerController');
var MoveController = require('../controllers/MoveController');

var _state = {
  games: [], // Stored in Firebase
  activeGame: undefined,
  isGameActive: false,
  isGamePlayed: false,
  potentialMoves: MoveController.MOVE_LIST,
  player: PlayerController.getPlayer()
};

var GameStore = Reflux.createStore({

  listenables: require('../actions/GameActions'),

  getInitialState: function() {

    console.log('_state', _state);

    return _state;
  },

  setInitialState: function(games) {

    // _state = GameController.getInitialState();

    console.log('_state', _state);

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

    console.log('game', game);

    _state.game = GameController.updateGame(game);

    console.log('game', game);

    _state.isGameActive = false;
    _state.isGamePlayed = true;

    // this.trigger(_state);
  },

  onCheckGame: function(game) {

    _state.game = game;

    this.trigger(_state);
  }
});

module.exports = GameStore;