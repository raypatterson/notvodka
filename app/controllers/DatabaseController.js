'use strict';

var logger = require('../utils/logger')('DatabaseController');

var Firebase = require('firebase');
var fb = new Firebase('https://notvodka.firebaseio.com/');
var fbGames = fb.child('games').push();
var fbPlayers = fb.child('players').push();;

var _setOnceEventHandler = function setOnceEventHandler(ref, cb, data) {

  ref.once('value', function(state) {

    logger.debug('FB key', state.key());
    logger.debug('FB val', state.val());

    cb(state.val(), state.key());

  }, function(error) {

    logger.error('WUHWUHWUHwuhwuh wuh wuh  wuh  wuh  wuuuuuhhhhh' + error.code);
  });

  if (data) {
    ref.set(data);
  }
};

var DatabaseController = {

  getInitialStateAsync: function(cb) {

    _setOnceEventHandler(fb, cb);
  },

  addGame: function(game, cb) {

    logger.debug('DatabaseController.addGame', game);

    _setOnceEventHandler(fbGames, cb, game);
  },

  addPlayer: function(player, cb) {

    logger.debug('DatabaseController.addPlayer', player);

    _setOnceEventHandler(fbPlayers, cb, player);
  }
};

module.exports = DatabaseController;