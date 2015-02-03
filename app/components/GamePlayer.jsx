/**
 * @jsx React.DOM
 */

'use strict';

var logger = require('../utils/logger')('GamePlayer');

var React = require('react');
var Reflux = require('reflux');

var RouterMixin = require('react-mini-router').RouterMixin;

var GamePlayer = React.createClass({

  mixins: [
    RouterMixin
  ],

  routes: {
    '/game/:stage': 'playerInactive',
    '/game/:stage/player/:id': 'playerActive'
  },

  render: function() {

    return (
      <div className="game-player">
        {this.renderCurrentRoute()}
      </div>
    );
  },

  playerInactive: function(gameStage) {

    logger.debug('playerInactive');

    return null;
  },

  playerActive: function(gameStage, playerId) {

    logger.debug('playerActive');

    return (
      <div>
        <p>Welcome Player</p>
      </div>
    );
  }
});

module.exports = GamePlayer;