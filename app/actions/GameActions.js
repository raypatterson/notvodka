var Reflux = require('reflux');

var GameActions = Reflux.createActions([
  'time',
  'move'
]);

module.exports = GameActions;