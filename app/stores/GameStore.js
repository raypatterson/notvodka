var request = require('superagent');

var Reflux = require('reflux');

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

  onMove: function(moveType) {

    // console.log('onMove');

    var self = this;

    request
      .post('api/move')
      .send({
        moveType: moveType
      })
      .set('Accept', 'application/json')
      .end(function(error, res) {

        console.log('res', res);
        // console.log('error', error);

        self.trigger(_state);
      });
  }
});

module.exports = GameStore;