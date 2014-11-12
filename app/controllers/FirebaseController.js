var Firebase = require('firebase');
var fb = new Firebase('https://isitvodka.firebaseio.com/');
var fbGames = fb.child('games');

var _setOnceEventHandler = function(ref, cb) {

  ref.once('value', function(state) {

    cb(state.val());

  }, function(error) {

    console.log('WUHWUHWUHwuhwuh wuh wuh  wuh  wuh  wuuuuuhhhhh' + error.code);
  });
};

var StateController = {

  getInitialStateAsync: function(cb) {

    _setOnceEventHandler(fb, cb);
  },

  addGame: function(game, cb) {

    console.log('StateController.addGame', game);

    _setOnceEventHandler(fbGames, cb);

    fbGames.push(game);
  }
};

module.exports = StateController;