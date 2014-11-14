/**
 * @jsx React.DOM
 */

var React = require('react');
var Reflux = require('reflux');

var GameStore = require('../stores/GameStore');

var GameResult = React.createClass({

  mixins: [Reflux.connect(GameStore)],

  getInitialState: function() {

    return GameStore.getInitialState();
  },

  render: function() {

    if (this.state.isGameComplete) {

      return (

        <div>
          <p>The correct answer was: <b>{this.state.results.answer.title}</b></p>
          <p>You answered: <b>{this.state.results.move.title}</b></p>
          <hr />
        </div>
      )
    } else {

      return null;
    }
  }
});

module.exports = GameResult;