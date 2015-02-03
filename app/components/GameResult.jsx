/**
 * @jsx React.DOM
 */

'use strict';

var logger = require('../utils/logger')('GameResult');

var React = require('react');
var Reflux = require('reflux');

var GameStore = require('../stores/GameStore');

var GameResult = React.createClass({

  mixins: [Reflux.connect(GameStore)],

  render: function() {

    return (

      <div className="game-result">
        <p>
          The correct answer was <b>{this.state.results.answer.title}</b>
          <br />
          Your answer is {this.state.results.isGameWonByGuessing ? 'correct!' : 'incorrect.'}
        </p>
      </div>
    );
  }
});

module.exports = GameResult;