'use strict';

var Reflux = require('reflux');

var GameActions = Reflux.createActions([
  'gameTic',
  'playerMove',
  'playerMoveComplete',
  'playerLogin',
  'playerLoginComplete',
  'scoreResults',
  'playAgain'
]);

module.exports = GameActions;