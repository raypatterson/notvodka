var TimeController = require('./app/controllers/TimeController');

var Sockets = function(io) {

  var active = 0;

  var callback = function(eventType, data) {
    io.emit(eventType, data);
  };

  io.on('connection', function(socket) {

    if (active === 0) {

      TimeController.start(callback);
    }

    active += 1;

    console.log(active + ' client sockets connected');

    socket.on('disconnect', function() {

      active -= 1;

      console.log(active + ' client sockets connected');

      if (active === 0) {

        TimeController.stop();
      }
    });
  });
};

module.exports = Sockets;