var SocketController = require('./SocketController')();
// var request = require('superagent');

var RequestController = {

  makePlayerMove: function(playerId, moveType) {

    SocketController.emit('move', {
      playerId: playerId,
      moveType: moveType
    });
  }

  // postPlayerMove: function(playerId, moveType) {

  //   request
  //     .post('api/move')
  //     .send({
  //       playerId: playerId,
  //       moveType: moveType
  //     })
  //     .set('Accept', 'application/json')
  //     .end(function(error, res) {

  //       console.log('res', res);
  //       // console.log('error', error);
  //     });
  // }
};

module.exports = RequestController;