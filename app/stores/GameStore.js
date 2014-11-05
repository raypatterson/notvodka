var Reflux = require('reflux');

var GameController = require('../controllers/GameController');

var GameStore = Reflux.createStore({

  listenables: require('../actions/GameActions'),

  getInitialState: function() {

    return GameController.getState();
  },

  onInitGame: function(state) {

    this.trigger(state);
  },

  onStartGame: function() {

    this.trigger(GameController.getState());
  },

  onPlayGame: function(moveType) {

    console.log('onPlayGame');

    var state = GameController.updatePlayerMove(moveType);

    this.trigger(state);
  },

  onCheckGame: function(state) {

    // console.log('onCheckGame');

    this.trigger(state);
  },

  onScoreGame: function(state) {

    console.log('onScoreGame');

    this.trigger(state);
  }
});

module.exports = GameStore;