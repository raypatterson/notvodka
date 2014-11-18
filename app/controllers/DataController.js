'use strict';

var DataController = {

  getMoveDTO: function(moveId, playerId) {

    return {
      move: {
        _id: moveId
      },
      player: {
        _id: playerId
      }
    };
  },

  getLoginDTO: function(playerName, playerId) {

    return {
      _id: playerId,
      name: playerName
    };
  },

  getPlayerDTO: function(moveDTO, socket) {
    return {
      moveDTO: moveDTO,
      socket: socket
    };
  }
};

module.exports = DataController;