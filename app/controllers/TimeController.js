var TIME_INTERVAL = 1000;
var TIME_LIMIT = 1000 * 5;

var _tic;

var _stop = function() {

  clearInterval(_tic);
};

var _start = function(cb, elapse) {

  _tic = setInterval(function() {

    _stop();

    if (elapse < TIME_LIMIT) {

      elapse += TIME_INTERVAL;

    } else {

      elapse = 0;
    }

    cb('tic', {
      time: {
        elapse: elapse,
        progress: elapse / TIME_LIMIT,
        seconds: Math.floor((TIME_LIMIT - elapse) / 1000)
      }
    });

    _start(cb, elapse);

  }, TIME_INTERVAL);
};

var TimeController = {

  start: function(cb) {

    console.log('Starting tic');

    _start(cb, 0);
  },

  stop: function() {

    console.log('Stopping tic');

    _stop();
  }
};

module.exports = TimeController;