var Reflux = require('reflux');

var GameActions = Reflux.createActions([
  'init',
  'time',
  'start',
  'play',
  'check',
  'score',
]);

module.exports = GameActions;