'use strict';

// var Logger = require('js-logger');
// Logger.useDefaults();

// module.exports = function(prefix) {
//   return Logger.get(prefix);
// };

var context = require('../utils/context');

var Logr = require('logr.js');

if (context.isClient) {
  window.Logr = Logr;
}

module.exports = function(prefix) {
  return Logr.log(prefix);
};