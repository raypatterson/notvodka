var ArenaController = require('./app/controllers/ArenaController');
var TimeController = require('./app/controllers/TimeController');

var Sockets = function(io) {

  ArenaController.init(io);

  io.on('connection', function(socket) {

    ArenaController.addPlayerClientSocket(socket);

    socket.on('disconnect', function() {

      ArenaController.removePlayerClientSocket(socket);
    });
  });
};

module.exports = Sockets;