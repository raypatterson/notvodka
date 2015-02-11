var _ = require('lodash');

var default_cfg = require('./default');

var env = process ? process.env.NODE_ENV || default_cfg.env_type.DEVELOPMENT : default_cfg.env_type.DEVELOPMENT;

var env_cfg = require('./env/' + env);

module.exports = _.assign(default_cfg, env_cfg);