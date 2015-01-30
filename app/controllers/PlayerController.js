'use strict';

var _active = [];

var PlayerController = {

  getPlayer: function() {

    return {
      _id: Date.now()
    }
  },

  addActivePlayer: function(moveDTO, socket) {

    _active.push(this.createPlayerDTO(moveDTO, socket));
  },

  getActivePlayers: function() {

    return _active.slice(0);
  },

  clearActivePlayers: function() {

    _active.splice(0);
  },

  createPlayerDTO: function(moveDTO, socket) {
    return {
      moveDTO: moveDTO,
      socket: socket
    };
  },

  createMoveDTO: function(moveId, playerId) {

    return {
      move: {
        _id: moveId
      },
      player: {
        _id: playerId
      }
    };
  },

  createLoginDTO: function(playerName, playerId) {

    return {
      _id: playerId,
      name: playerName
    };
  }
};

module.exports = PlayerController;