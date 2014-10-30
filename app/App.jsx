/**
 * @jsx React.DOM
 */

var React = require('react');

var GameApp = require('./components/GameApp.jsx');
var GameStore = require('./stores/GameStore');

var App = React.createClass({

  getInitialState: function() {

    // 'state' is loaded async in app.js
    // As good a place as any to init store
    GameStore.setInitialState(this.props.state);

    return {};
  },

  render: function() {

    return (
      <GameApp />
    );
  }
});

module.exports = App;