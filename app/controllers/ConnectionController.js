'use strict';

var logger = require('../utils/logger')('ConnectionController');

var NUM_SERVER_CONNECTIONS = 1;
var _connections = 0;
var _onActive;
var _onInactive;

var ConnectionController = {

  init: function(onActive, onInactive) {

    _onActive = onActive;
    _onInactive = onInactive;
  },

  add: function() {

    if (_connections++ === NUM_SERVER_CONNECTIONS) {

      _onActive(_connections);
    }

    logger.debug(_connections + ' connections');
  },

  remove: function() {

    if (--_connections === NUM_SERVER_CONNECTIONS) {

      _onInactive(_connections);
    }

    logger.debug(_connections + ' connections');
  }
};

module.exports = ConnectionController;