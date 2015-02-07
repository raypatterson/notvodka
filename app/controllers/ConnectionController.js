'use strict';

var logger = require('../utils/logger')('ConnectionController');

var _ = require('lodash');

var Remote = require('q-connection');

var MessageType = require('../io/Enum').MessageType;
var EventType = require('../io/Enum').EventType;
var Connection = require('../io/Connection');

var NUM_SERVER_CONNECTIONS = 1;

var _connections = [];

var _createConnection = function createConnection(socket, api) {

  var port = {
    postMessage: function(message) {
      // logger.debug('Post Message', message);
      socket.send(message);
    },
    onmessage: null // gets filled in by Q-Connection
  };

  socket.on(EventType.MESSAGE, function message(data) {

    port.onmessage({
      data: data
    });
  });

  // Allows the client to access the ID include in requests back to the server
  // TODO: Is there a better way to make this association?
  var id = socket.id;

  api.connectionId = id;

  var remote = Remote(port, api);

  var connection = new Connection(id, socket, remote);

  return connection;
};

var _callback = function callback(cb, argsArray) {
  if (cb && typeof(cb) === 'function') {
    cb.apply(null, argsArray);
  }
};

var ConnectionController = {

  init: function(
    server,
    api,
    onConnectionsActive,
    onConnectionsInactive,
    onConnectionAdded,
    onConnectionRemoved
  ) {

    server.on(EventType.CONNECT, function connection(socket) {

      // logger.debug(EventType.CONNECT);

      var connection = _createConnection(socket, api);

      if (_connections.length === NUM_SERVER_CONNECTIONS) {

        _callback(onConnectionsActive, _connections);
      }

      _connections.push(connection);

      logger.debug(_connections.length + ' connections');

      _callback(onConnectionAdded, connection);

      socket.on(EventType.DISCONNECT, function close() {

        // logger.debug(EventType.DISCONNECT);

        connection = _connections.splice(_connections.indexOf(connection), 1)[0];

        _callback(onConnectionRemoved, connection);

        if (_connections.length === NUM_SERVER_CONNECTIONS) {

          _callback(onConnectionsInactive, _connections);
        }

        logger.debug(_connections.length + ' connections');
      });
    });
  },

  getConnectionById: function getConnectionById(id) {
    return _connections.filter(function(connection) {
      return connection.id === id;
    })[0];
  },

  getAllConnections: function getAllConnections() {
    return _connections.slice(0);
  }
};

module.exports = ConnectionController;