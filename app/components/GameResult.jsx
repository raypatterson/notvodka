/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Reflux = require('reflux');

var GameStore = require('../stores/GameStore');
var GameActions = require('../actions/GameActions');

var GameResult = React.createClass({

  mixins: [Reflux.connect(GameStore)],

  getInitialState: function() {

    return GameStore.getInitialState();
  },

  onSubmit: function(e) {

    e.preventDefault();

    GameActions.playerLogin(this.refs.playerName.state.value);

    return false;
  },

  render: function() {

    if (this.state.isGameComplete) {

      return (

        <div className="game-result">
          <p>
            The correct answer was <b>{this.state.results.answer.title}</b>
            <br />
            Your answer is {this.state.results.isGameWonByGuessing ? 'correct!' : 'incorrect.'}
          </p>
          <hr />
          <p>Want to keep track of your score?</p>
          <form className="form-inline" role="form">
            <div className="form-group">
              <input type="name" className="form-control" ref="playerName" placeholder="Enter name" maxLength="30" />
            </div>
            <button type="submit" className="btn btn-default" onClick={this.onSubmit}>Submit</button>
          </form>
        </div>
      )
    } else {

      return null;
    }
  }
});

module.exports = GameResult;