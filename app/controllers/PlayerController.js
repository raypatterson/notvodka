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
  },

  getHasWonByGuessing: function(playerMove, correctMove) {

    return playerMove.type === correctMove.type ? true : false;
  },

  getHasWonByDisagreeing: function(playerMove, opponentMoves) {

    return !_.contains(opponentMoves, playerMove);
  }
};

module.exports = PlayerController;