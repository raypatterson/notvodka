/**
 * @jsx React.DOM
 */

var React = require('react');

var GameResult = React.createClass({

  render: function() {

    var results = this.props.results;

    return (

      <div>
        <p>The correct answer was: <b>{results.answer.title}</b></p>
        <p>You answered: <b>{results.move.title}</b></p>
        <hr />
      </div>
    )
  }
});

module.exports = GameResult;