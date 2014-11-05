var Firebase = require('firebase');
var fb = new Firebase('https://isitvodka.firebaseio.com/');
var fbPlayers = fb.child('players');

var _activePlayers = [];

var PlayerController = {

  getPlayer: function() {

    return {
      _id: Date.now(),
      move: undefined,
      hasWonByGuessing: false,
      hasWonByDisagreeing: false
    }
  }
};

module.exports = PlayerController;