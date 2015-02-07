'use strict';

var logger = require('../utils/logger')('Client');

var multimethod = require('multimethod');

var EventType = require('./Enum').EventType;
var MessageType = require('./Enum').MessageType;
var Message = require('./Message');

var socket = require('engine.io-client')('http://localhost:8000');

var Connection = require("q-connection");

var ServerAPI = Connection(socket);

var GameActions = require('../actions/GameActions');

var _connectionId;

var _getData = function(input) {
  return input.data;
}

var _getType = function(input) {
  return input.type;
}

var _multimethod = multimethod()
  .dispatch(function(input) {

    return _getType(input) || null;
  })
  .when(MessageType.TIC, function(input) {

    GameActions.gameTic(_getData(input));

    return true;
  })
  .when(MessageType.BZZ, function(input) {

    GameActions.scoreResults(_getData(input));

    return true;
  });

var _handleMessage = function handleMessage(data) {

  // JSON --> POJO
  var data = JSON.parse(data);

  // Check for noise messages
  if (data.args) {
    _multimethod(data.args[0])
  };
};

socket.on(EventType.OPEN, function open() {

  // logger.debug(EventType.OPEN);

  ServerAPI
    .get('connectionId')
    .then(function(connectionId) {
      // Need to include this ID in direct calls to server API
      // TODO: Figure out if there is a simple way to map client results to specific server handlers
      _connectionId = connectionId;
    });

  socket.on(EventType.MESSAGE, function message(data) {

    // logger.debug(EventType.MESSAGE, data);

    _handleMessage(data);
  });
});

socket.on(EventType.CLOSE, function close() {

  logger.debug(EventType.CLOSE);
});

var Client = {

  send: function send(type, data, onFulfilled, onRejected) {

    data.connectionId = _connectionId;

    ServerAPI
      .invoke(type, data)
      .then(onFulfilled, onRejected);
  }
};

module.exports = Client;