'use strict';

var logger = require('../utils/logger')('GameStore');

var Reflux = require('reflux');

var RouteType = require('../routes/Enum').RouteType;

var MessageType = require('../io/Enum').MessageType;
var Client = require('../io/Client');

var PlayerController = require('../controllers/PlayerController');
var MoveController = require('../controllers/MoveController');

var navigate = require('../components/GameRouter.jsx').navigate;

var _state = {};
var _self;

var _navigate = function(route) {

  var route = (_state.login !== undefined) ? route + RouteType.GAME_PLAYER + _state.login._id : route;

  navigate(route);
};

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

    // logger.debug('onGameTic');

    _state.time = time;

    _self.trigger(_state);
  },

  onPlayerMove: function(id) {

    logger.debug('onPlayerMove');

    var dto = PlayerController.createMoveDTO(id, _state.player._id);

    Client.send(MessageType.MOVE, dto);
  },

  onPlayerMoveComplete: function() {

    logger.debug('onPlayerMoveComplete');

    _state.isGamePlayed = true;

    _self.trigger(_state);
  },

  onPlayerLogin: function(playerName) {

    logger.debug('onPlayerLogin', playerName);

    var dto = PlayerController.createLoginDTO(playerName, _state.player._id);

    Client.send(MessageType.LOGIN, dto);
  },

  onPlayerLoginComplete: function(loginDTO) {

    logger.debug('onPlayerLoginComplete');

    console.log('loginDTO', loginDTO);

    _state.login = loginDTO;

    _self.trigger(_state);

    _navigate(RouteType.GAME_PODIUM);
  },

  onScoreResults: function(score) {

    logger.debug('onScoreResults');

    _state.results = {
      move: MoveController.getMoveById(score.move._id),
      answer: MoveController.getMoveById(score.answer._id),
      isGameWonByGuessing: (score.move._id === score.answer._id)
    };

    _state.isGameComplete = true;

    _self.trigger(_state);

    _navigate(RouteType.GAME_PODIUM);
  },

  onPlayAgain: function() {

    logger.debug('onPlayAgain');

    _state.isGamePlayed = false;
    _state.isGameComplete = false;

    _self.trigger(_state);

    _navigate(RouteType.GAME_FIELD);
  }
});

module.exports = GameStore;