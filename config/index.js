var _ = require('lodash');

var default_cfg = require('./default');

var env_cfg = require('./env/' + (process.env.NODE_ENV || default_cfg.env_type.DEVELOPMENT));

module.exports = _.assign(default_cfg, env_cfg);