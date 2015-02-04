/**
 * @jsx React.DOM
 */

'use strict';

var logger = require('../utils/logger')('GameStats');

var React = require('react');
var Reflux = require('reflux');

var RouteType = require('../routes/Enum').RouteType;

var GameStore = require('../stores/GameStore');

var GameStats = React.createClass({

  mixins: [Reflux.connect(GameStore)],

  render: function() {

    return (
      <p className="game-stats">Hey there, {this.state.login.name}!</p>
    );
  }
});

module.exports = GameStats;