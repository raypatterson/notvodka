'use strict';

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

  onGameTic: function(data) {

    // logger.debug('onGameTic', data);

    // TODO: Make a different store for the game tic so it isn't trying to update DOM state on server
    if (_self) {
      _state.time = data.time;
      _self.trigger(_state)
    };
  },

  onPlayerMove: function(id) {

    logger.debug('onPlayerMove');

    var moveDTO = PlayerController.createMoveDTO(id, _state.player._id);

    Client.send(

      MessageType.MOVE,

      moveDTO,

      function onFulfilled() {

        logger.debug('onPlayerMove onFulfilled');

        _state.move = moveDTO.move;
        _state.isGamePlayed = true;

        _self.trigger(_state);
      },

      function onRejected(reason) {

        logger.error('onPlayerMove onRejected', reason);
      }
    );
  },

  onScoreResults: function(score) {

    logger.debug('onScoreResults', score);

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
  },

  onPlayerLogin: function(playerName) {

    logger.debug('onPlayerLogin', playerName);

    var data = PlayerController.createLoginDTO(playerName, _state.player._id);

    // Client.send(MessageType.LOGIN, dto);

    Client.send(

      MessageType.LOGIN,

      data,

      function onFulfilled(login) {

        logger.debug('onPlayerLogin onFulfilled', login);

        _state.login = login;

        _self.trigger(_state);

        _navigate(RouteType.GAME_PODIUM);
      },

      function onRejected(reason) {

        logger.error('onPlayerLogin onRejected', reason);
      }
    );
  }
});

var logger = require('../utils/logger')('GameStore');

// logger.attach(GameStore);

module.exports = GameStore;