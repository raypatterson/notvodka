'use strict';

var Reflux = require('reflux');
var navigate = require('react-mini-router').navigate;

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

    // console.log('GameStore.onGameTic');

    _state.time = time;

    _self.trigger(_state);
  },

  onPlayerMove: function(id) {

    console.log('GameStore.onPlayerMove');

    var dto = DataController.getMoveDTO(id, _state.player._id);

    var cb = function(data) {

      console.log('GameStore.onPlayerMove.cb', data);

      _state.isGamePlayed = true;

      _self.trigger(_state);
    };

    SocketController.emit('move', dto, cb);
  },

  onScoreResults: function(score) {

    console.log('GameStore.onScoreResults');

    _state.results = {
      move: MoveController.getMoveById(score.move._id),
      answer: MoveController.getMoveById(score.answer._id),
      isGameWonByGuessing: (score.move._id === score.answer._id)
    };

    _state.isGameComplete = true;

    _self.trigger(_state);

    navigate('/podium');
  },

  onPlayAgain: function() {

    console.log('GameStore.onPlayAgain');

    _state.isGamePlayed = false;
    _state.isGameComplete = false;

    _self.trigger(_state);
  },

  onPlayerLogin: function(playerName) {

    console.log('GameStore.onPlayerLogin', playerName);

    var dto = DataController.getLoginDTO(playerName, _state.player._id);

    var cb = function(data) {

      console.log('GameStore.onPlayerLogin.cb', data);

      _self.trigger(_state);
    };

    SocketController.emit('login', dto, cb);
  }
});

module.exports = GameStore;