var request = require('superagent');

var Reflux = require('reflux');

var SocketController = require('../controllers/SocketController')();
var DataController = require('../controllers/DataController');
var MoveController = require('../controllers/MoveController');

var _state;

var GameStore = Reflux.createStore({

  listenables: require('../actions/GameActions'),

  setInitialState: function(state) {

    _state = state;
  },

  getInitialState: function() {

    return _state;
  },

  onTime: function(time) {

    // console.log('onTime');

    _state.time = time;

    this.trigger(_state);
  },

  onMove: function(id) {

    // console.log('onMove');

    SocketController.emit('move', DataController.getMoveDTO(id, _state.player._id));

    _state.isGamePlayed = true;

    this.trigger(_state);
  },

  onScore: function(score) {

    console.log('onScore');

    _state.results = {
      move: MoveController.getMoveById(score.move._id),
      answer: MoveController.getMoveById(score.answer._id),
      isGameWonByGuessing: (score.move._id === score.answer._id)
    };

    _state.isGameComplete = true;

    this.trigger(_state);
  },

  onStart: function() {

    console.log('onStart');

    _state.isGamePlayed = false;
    _state.isGameComplete = false;

    this.trigger(_state);
  }
});

module.exports = GameStore;