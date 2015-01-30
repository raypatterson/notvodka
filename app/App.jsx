/**
 * @jsx React.DOM
 */

'use strict';

var logger = require('./utils/logger')('App');

var React = require('react');

var RouterMixin = require('react-mini-router').RouterMixin;

var GameStore = require('./stores/GameStore');

var GameArena = require('./components/GameArena.jsx');
var GamePodium = require('./components/GamePodium.jsx');

var App = React.createClass({

  mixins: [RouterMixin],

  getInitialState: function() {

    GameStore.setInitialState(this.props.state);

    return null;
  },

  routes: {
    '/arena': 'arena',
    '/podium': 'podium'
  },

  render: function() {

    return (
      <div className="game-container">
        <div className="row header">
          <div className="col-md-12 page-header">
            <h1>Is it Vodka?</h1>
          </div>
        </div>
        {this.renderCurrentRoute()}
      </div>
    );
  },

  arena: function arena() {

    return <GameArena />;
  },

  podium: function podium() {

    return <GamePodium />;
  }
});

module.exports = App;