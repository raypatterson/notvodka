var TIME_INTERVAL = 1000;
var TIME_LIMIT = 1000 * 5;

var _activeConnections = 0;
var _isGameTicActive = false;
var _isServerConnected = false;

var _gameTic;

var _stopGameTic = function() {

  // console.log('_stopGameTic');

  clearInterval(_gameTic);
};

var _startGameTic = function(socket, elapse) {

  // console.log('_startGameTic');

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

    if (_isServerConnected === true) {

      _activeConnections += 1;

      console.log(_activeConnections + ' socket clients connected');

      if (_isGameTicActive === false) {

        console.log('Starting game tic.');

        _isGameTicActive = true;
        _startGameTic(socket, 0);
      }

      socket.on('disconnect', function() {

        _activeConnections -= 1;

        console.log(_activeConnections + ' socket clients connected');

        if (_isGameTicActive === true && _activeConnections === 0) {

          console.log('Stopping game tic.');

          _isGameTicActive = false;
          _stopGameTic();
        }
      });

      // socket.on('toc', function(data) {
      //   console.log('toc', data);
      // });

    } else {

      _isServerConnected = true;

      console.log('Socket server has connected');
    }
  });
};

module.exports = Sockets;