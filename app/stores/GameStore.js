var request = require('superagent');

var Reflux = require('reflux');

var RequestController = require('../controllers/RequestController');

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

  onMove: function(moveType) {

    // console.log('onMove');

    RequestController.makePlayerMove(_state.player._id, moveType);
  }
});

module.exports = GameStore;