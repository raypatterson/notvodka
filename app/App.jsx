/**
 * @jsx React.DOM
 */

var React = require('react');

var GameApp = require('./components/GameApp.jsx');

var GameActions = require('./actions/GameActions');

var App = React.createClass({

  getInitialState: function() {

    // 'state' is loaded async in app.js
    // As good a place as any to init controller
    // GameController.setInitialState(this.props.state);

    GameActions.init(this.props.state);

    return {};
  },

  render: function() {

    return (
      <GameApp />
    );
  }
});

module.exports = App;