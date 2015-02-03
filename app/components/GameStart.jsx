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

  clickHandler: function(event) {

    event.preventDefault();

    GameActions.playAgain();
  },

  render: function() {

    return (

      <button
        className="btn btn-lg btn-default" 
        type="button" 
        onClick={this.clickHandler}>
        Start a new game
      </button>
    );
  }
});

module.exports = GameStart;