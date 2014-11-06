var TIME_INTERVAL = 1000;
var TIME_LIMIT = 1000 * 5;

var _activeConnections = 0;

var _gameTic;

var _stopGameTic = function() {

  console.log('_stopGameTic');

  clearInterval(_gameTic);
};

var _startGameTic = function(socket, elapse) {

  console.log('_startGameTic');

  _gameTic = setInterval(function() {

    _stopGameTic();

    if (elapse < TIME_LIMIT) {

      elapse += TIME_INTERVAL;

    } else {

      elapse = 0;
    }

    socket.emit('tic', {
      time: {
        elapse: elapse,
        progress: elapse / TIME_LIMIT,
        seconds: Math.floor((TIME_LIMIT - elapse) / 1000) + 1
      }
    });

    _startGameTic(socket, elapse);

  }, TIME_INTERVAL);
};

var Sockets = function(io) {

  console.log('Sockets');

  io.on('connection', function(socket) {

    if (_activeConnections === 1) {
      _startGameTic(socket, 0);
    }

    _activeConnections += 1;

    console.log('connection', _activeConnections);

    socket.on('disconnect', function() {

      _activeConnections -= 1;

      if (_activeConnections === 1) {
        _stopGameTic();
      }

      console.log('disconnect', _activeConnections);
    });

    socket.on('toc', function(data) {
      console.log('toc', data);
    });
  });
};

module.exports = Sockets;