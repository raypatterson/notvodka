'use strict';

var logger = require('../utils/logger')('Client');

var multimethod = require('multimethod');

var EventType = require('./Enum').EventType;
var MessageType = require('./Enum').MessageType;
var Message = require('./Message');

var socket = require('engine.io-client')('http://localhost:8000');

var GameActions = require('../actions/GameActions');

var _connectionId;

var _handleMessage = multimethod()
  .dispatch(function(o) {

    logger.debug('data', o);

    var type = o.type;
    var data = o.data;

    return type;
  })
  .when(MessageType.ID, function(o) {

    // logger.debug('Handle Message', MessageType.ID);

    return true;
  });

// var _handleMessage = function receiveMessage(messageDTO) {

//   var json = JSON.parse(messageDTO);
//   var type = json.type;
//   var data = json.data;

//   // logger.debug('Received event type: ', type);

//   switch (type) {

//     case MessageType.TIC:

//       GameActions.gameTic(data.time);

//       break;

//     case MessageType.BZZ:

//       GameActions.scoreResults(data);

//       break;

//     case MessageType.MOVE_COMPLETE:

//       GameActions.playerMoveComplete(data);

//       break;

//     case MessageType.LOGIN_COMPLETE:

//       GameActions.playerLoginComplete(data);

//       break;

//     default:

//       logger.error('Event type unknown: ', type);
//       logger.error('Data: ', messageDTO);
//   }
// };

var Connection = require("q-connection");

var ServerAPI = Connection(socket);

socket.on(EventType.OPEN, function open() {

  logger.debug(EventType.OPEN);

  ServerAPI
    .get('connectionId')
    .then(function(connectionId) {
      logger.debug('connectionId:', connectionId);

      // Need to include in direct calls to server API
      // TODO: Figure out if there is a simpleer way to map client reusets to specific server handlers
      _connectionId = connectionId;
    });

  socket.on(EventType.MESSAGE, function message(data) {

    logger.debug(EventType.MESSAGE, data);

    _handleMessage(JSON.parse(data));
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