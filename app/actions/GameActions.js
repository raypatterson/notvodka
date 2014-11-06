var Reflux = require('reflux');

var GameActions = Reflux.createActions([
  'initGame',
  'startGame',
  'playGame',
  'checkGame',
  'scoreGame',
]);

module.exports = GameActions;