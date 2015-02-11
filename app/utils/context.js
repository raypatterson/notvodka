var cfg = require('../../config');

var isClient = typeof window !== 'undefined';

var ctx = isClient ? window.location : cfg;

var isDevelopment = process ? process.env.NODE_ENV === cfg.env_type.DEVELOPMENT || process.env.NODE_ENV === undefined : true;

var port =
  // Is client
  isClient ? window.location.port :
  // Is production server
  process ? process.env.PORT :
  // Is development server
  cfg.port || 5000;

var hostname = ctx.protocol + '//' + ctx.hostname + ':' + port;

module.exports = {
  isClient: isClient,
  isDevelopment: isDevelopment,
  port: port,
  hostname: hostname
};