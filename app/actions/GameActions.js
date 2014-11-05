var Reflux = require('reflux');

var GameActions = Reflux.createActions([
  'startGame',
  'playGame',
  'checkGame'
]);

module.exports = GameActions;