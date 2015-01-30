'use strict';

var logger = require('../utils/logger')('StateController');

var DatabaseController = require('./DatabaseController');
var PlayerController = require('./PlayerController');
var MoveController = require('./MoveController');

var StateController = {

  getInitialStateAsync: function(cb) {

    DatabaseController.getInitialStateAsync(function onGetInitialStateAsync(state) {

      state.isGamePlayed = false;
      state.isGameComplete = false;
      state.player = PlayerController.getPlayer();
      state.potentialMoves = MoveController.MOVE_LIST;

      cb(state);
    });
  }
};

module.exports = StateController;