'use strict';

var request = require('superagent');

var Reflux = require('reflux');

var SocketController = require('../controllers/SocketController')();
var DataController = require('../controllers/DataController');
var MoveController = require('../controllers/MoveController');

var _state;
var _self;

var GameStore = Reflux.createStore({

  listenables: require('../actions/GameActions'),

  setInitialState: function(state) {

    _self = this;

    _state = state;
  },

  getInitialState: function() {

    return _state;
  },

  onGameTic: function(time) {

    // console.log('onGameTic');

    _state.time = time;

    _self.trigger(_state);
  },

  onPlayerMove: function(id) {

    console.log('onPlayerMove');

    var dto = DataController.getMoveDTO(id, _state.player._id);

    var cb = function(data) {

      console.log('onPlayerMove.cb', data);

      _state.isGamePlayed = true;

      _self.trigger(_state);
    };

    SocketController.emit('move', dto, cb);
  },

  onScoreResults: function(score) {

    console.log('onScoreResults');

    _state.results = {
      move: MoveController.getMoveById(score.move._id),
      answer: MoveController.getMoveById(score.answer._id),
      isGameWonByGuessing: (score.move._id === score.answer._id)
    };

    _state.isGameComplete = true;

    _self.trigger(_state);
  },

  onPlayAgain: function() {

    console.log('onPlayAgain');

    _state.isGamePlayed = false;
    _state.isGameComplete = false;

    _self.trigger(_state);
  },

  onPlayerLogin: function(name) {

    console.log('onPlayerLogin', name);

    var dto = DataController.getSignDTO(name, _state.player._id);

    var cb = function(data) {
      console.log('onPlayerLogin.cb', data);

      _self.trigger(_state);
    };

    SocketController.emit('login', dto, cb);
  }
});

module.exports = GameStore;