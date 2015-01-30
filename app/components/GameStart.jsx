/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Reflux = require('reflux');

var GameStore = require('../stores/GameStore');
var GameActions = require('../actions/GameActions');

var GameStart = React.createClass({

  mixins: [Reflux.connect(GameStore)],

  onClick: function(event) {

    event.preventDefault();

    GameActions.playAgain();

    return false;
  },

  render: function() {

    if (this.state.isGameComplete) {

      return (

        <button
          className="btn btn-lg btn-default" 
          type="button" 
          onClick={this.onClick}>
          Start a new game
        </button>
      )
    } else {

      return null;
    }
  }
});

module.exports = GameStart;