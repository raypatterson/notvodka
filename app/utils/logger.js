'use strict';

// var Logger = require('js-logger');
// Logger.useDefaults();

// module.exports = function(prefix) {
//   return Logger.get(prefix);
// };

var Logger = require('logr.js');

module.exports = function(prefix) {
  return Logger.log(prefix);
};