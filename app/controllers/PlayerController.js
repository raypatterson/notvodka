var Firebase = require('firebase');
var fb = new Firebase('https://isitvodka.firebaseio.com/');
var fbPlayers = fb.child('players');

var _players = [];

var PlayerController = {

  getPlayer: function() {

    return {
      _id: Date.now()
    }
  }
};

module.exports = PlayerController;