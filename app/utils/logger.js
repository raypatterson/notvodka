'use strict';

var Logger = require('js-logger');

Logger.useDefaults();

module.exports = function(prefix) {
  return Logger.get(prefix);
};