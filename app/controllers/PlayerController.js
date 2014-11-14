var DataController = require('./DataController');

var _active = [];

var PlayerController = {

  getPlayer: function() {

    return {
      _id: Date.now()
    }
  },

  addActivePlayer: function(moveDTO, socket) {

    _active.push(DataController.getPlayerDTO(moveDTO, socket));
  },

  getActivePlayers: function() {

    return _active.slice(0);
  },

  clearActivePlayers: function() {

    _active.splice(0);
  }
};

module.exports = PlayerController;