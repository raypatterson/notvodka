'use strict';

var _connections = 0;
var _onActive;
var _onInactive;

var ConnectionController = {

  init: function(onActive, onInactive) {

    _onActive = onActive;
    _onInactive = onInactive;
  },

  add: function() {

    if (_connections++ === 0) {

      _onActive(_connections);
    }

    console.log(_connections + ' connections');
  },

  remove: function() {

    if (--_connections === 0) {

      _onInactive(_connections);
    }

    console.log(_connections + ' connections');
  }
};

module.exports = ConnectionController;