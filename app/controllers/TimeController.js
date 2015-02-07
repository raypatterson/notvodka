'use strict';

var logger = require('../utils/logger')('TimeController');

var TIME_INTERVAL = 16;
var TIME_LIMIT = 1000 * 5;

var _tic;

var _onTic;
var _onBzz;

var _stop = function stop() {

  clearInterval(_tic);
};

var _start = function start(elapse) {

  _tic = setInterval(function() {

    _stop();

    if (elapse < TIME_LIMIT) {

      elapse += TIME_INTERVAL;

    } else {

      elapse = 0;

      _onBzz();
    }

    _onTic({
      time: {
        elapse: elapse,
        progress: elapse / TIME_LIMIT,
        seconds: Math.floor((TIME_LIMIT - elapse) / 1000)
      }
    });

    _start(elapse);

  }, TIME_INTERVAL);
};

var TimeController = {

  init: function(onTic, onBzz) {

    _onTic = onTic;
    _onBzz = onBzz;

  },

  start: function() {

    logger.info('Starting tic');

    _start(0);
  },

  stop: function() {

    logger.info('Stopping tic');

    _stop();
  }
};

module.exports = TimeController;