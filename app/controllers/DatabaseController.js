'use strict';

var Firebase = require('firebase');
var fb = new Firebase('https://notvodka.firebaseio.com/');
var fbGames = fb.child('games').push();
var fbPlayers = fb.child('players').push();;

var _setOnceEventHandler = function(ref, cb, data) {

  ref.once('value', function(state) {

    console.log('FB key', state.key());
    console.log('FB val', state.val());

    cb(state.val(), state.key());

  }, function(error) {

    console.log('WUHWUHWUHwuhwuh wuh wuh  wuh  wuh  wuuuuuhhhhh' + error.code);
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

    console.log('DatabaseController.addGame', game);

    _setOnceEventHandler(fbGames, cb, game);
  },

  addPlayer: function(player, cb) {

    console.log('DatabaseController.addPlayer', player);

    _setOnceEventHandler(fbPlayers, cb, player);
  }
};

module.exports = DatabaseController;