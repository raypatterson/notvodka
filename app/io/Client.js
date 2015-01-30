'use strict';

var logger = require('../utils/logger')('Client');

var EventType = require('./Enum').EventType;
var MessageType = require('./Enum').MessageType;
var Message = require('./Message');

var socket = require('engine.io-client')('http://localhost:8000');

var GameActions = require('../actions/GameActions');

var _receiveMessage = function receiveMessage(messageDTO) {

  var json = JSON.parse(messageDTO);
  var type = json.type;
  var data = json.data;

  logger.debug('Received event type: ', type);

  switch (type) {

    case MessageType.TIC:

      GameActions.gameTic(data.time);

      break;

    case MessageType.BZZ:

      GameActions.scoreResults(data);

      break;

    case MessageType.MOVE_COMPLETE:

      GameActions.playerMoveComplete();

      break;

    case MessageType.LOGIN_COMPLETE:

      GameActions.playerLoginComplete();

      break;

    default:

      logger.error('Event type unknown: ', type);
  }
};

socket.on(EventType.OPEN, function open() {

  logger.debug(EventType.OPEN);

  socket.on(EventType.MESSAGE, function message(messageDTO) {

    _receiveMessage(messageDTO);
  });
});

socket.on(EventType.CLOSE, function close() {

  logger.debug(EventType.CLOSE);
});

var Client = {

  send: function send(type, data) {

    Message.send(socket, type, data);
  }
};

module.exports = Client;