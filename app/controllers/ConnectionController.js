'use strict';

var ConnectionController = function() {

  var _check = function() {

    if (_connected++ === 0) {

      TimeController.start(_onTic, _onBzz);

    } else {

      TimeController.stop();
    }
  };

  return {

    add: function() {

      _connected++;

      this.check();
    }

    remove: function() {

      if (--_connected === 0) {

        TimeController.start(_onTic, _onBzz);

      } else {


      }
    }
  }
};

module.exports = ConnectionController;