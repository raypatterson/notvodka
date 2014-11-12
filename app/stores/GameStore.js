var Reflux = require('reflux');

var GameController = require('../controllers/GameController');
var PlayerController = require('../controllers/PlayerController');
var MoveController = require('../controllers/MoveController');

var _state = {
  games: [],
  time: {},
  isGameActive: false,
  isGamePlayed: false,
  isGameComplete: false,
  activeGame: GameController.getGame(),
  player: PlayerController.getPlayer(),
  potentialMoves: MoveController.MOVE_LIST
};

var GameStore = Reflux.createStore({

  listenables: require('../actions/GameActions'),

  getInitialState: function() {

    return _state;
  },

  onInit: function(state) {

    _state.games = state.games; // From Firebase

    this.trigger(_state);
  },

  onTime: function(time) {

    _state.time = time;

    this.trigger(_state);
  },

  onStart: function() {

    console.log('onStart');

    this.trigger(_state);
  },

  onPlay: function(moveType) {

    console.log('onPlay');

    var state = GameController.updatePlayerMove(moveType);

    this.trigger(state);
  },

  onCheck: function(state) {

    // console.log('onCheckGame');

    this.trigger(state);
  },

  onScore: function(state) {

    console.log('onScoreGame');

    this.trigger(state);
  }
});

module.exports = GameStore;