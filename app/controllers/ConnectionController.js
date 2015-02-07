'use strict';

var logger = require('../utils/logger')('ConnectionController');

var Remote = require('q-connection');

var MessageType = require('../io/Enum').MessageType;
var EventType = require('../io/Enum').EventType;
var Connection = require('../io/Connection');

var NUM_SERVER_CONNECTIONS = 1;

var _connections = [];

var _createConnection = function createConnection(socket, api) {

  var port = {
    postMessage: function(message) {
      logger.info('Post Message', message);
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
  // TODO: Is there a cleander way to make this association?
  var id = socket.id;

  api.connectionId = id;

  var remote = Remote(port, api);

  var connection = new Connection(id, socket, remote);

  return connection;
};

var ConnectionController = {

  init: function(server, api, onConnectionAdded, onConnectionRemoved, onConnectionsActive, onConnectionsInactive) {


    server.on(EventType.CONNECT, function connection(socket) {

      logger.info(EventType.CONNECT);

      var connection = _createConnection(socket, api);

      _connections.push(connection);

      if (_connections.length === NUM_SERVER_CONNECTIONS) {

        onConnectionsActive(_connections);
      }

      logger.debug(_connections.length + ' connections');

      onConnectionAdded(connection);

      socket.on(EventType.DISCONNECT, function close() {

        logger.info(EventType.DISCONNECT);

        _connections.splice(_connections.indexOf(connection), 1);

        onConnectionRemoved(connection);

        if (_connections.length === NUM_SERVER_CONNECTIONS) {

          onConnectionsInactive(_connections);
        }

        logger.debug(_connections.length + ' connections');
      });
    });
  },

  getConnectionById: function getConnections(id) {
    return _connections.filter(function(connection) {
      return connection.id === id;
    })[0];
  },

  getAllConnections: function getConnections() {
    return _connections.slice(0);
  }
};

module.exports = ConnectionController;