var Reflux = require('reflux');

var GameActions = Reflux.createActions([
  'time',
  'move',
  'score',
  'start'
]);

module.exports = GameActions;