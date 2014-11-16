var Reflux = require('reflux');

var GameActions = Reflux.createActions([
  'gameTic',
  'playerMove',
  'scoreResults',
  'playAgain',
  'playerLogin'
]);

module.exports = GameActions;