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

  getPlayerDTO: function(moveDTO, socket) {
    return {
      moveDTO: moveDTO,
      socket: socket
    };
  }
};

module.exports = DataController;