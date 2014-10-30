/**
 * @jsx React.DOM
 */

var React = require('react');

var GameResult = React.createClass({

  render: function() {

    console.log('props', this.props);

    var opponentMoves = this.props.game.opponentMoves
    var opponentMoveElements = [];

    var i = 0,
      l = this.props.game.opponentMoves.length,
      move;

    for (i; i < l; i++) {
      move = opponentMoves[i];
      opponentMoveElements.push(<b>{move.title}</b>);
      if (i % 2 === 0) {
        opponentMoveElements.push(' & ');
      }
    }

    var statusMessage = [];

    if (this.props.isGameWonByGuessing) {

      statusMessage.push(<p>You <b>won</b> because you guessed <b>right</b>, </p>);

      if (this.props.isGameWonByDisagreeing) {
        statusMessage.push(<p>AND you <b>won</b> because you <b>disagreed</b> with everyone else!</p>);
      } else {
        statusMessage.push(<p>BUT you <b>lost</b> because you <b>agreed</b> with someone else!</p>);
      }
    } else {

      statusMessage.push(<p>You <b>lost</b> because you guessed <b>wrong</b>,</p>);

      if (this.props.isGameWonByDisagreeing) {
        statusMessage.push(<p>BUT you <b>won</b> because you <b>disagreed</b> with everyone else!</p>);
      } else {
        statusMessage.push(<p>AND you <b>lost</b> because you <b>agreed</b> with someone else!</p>);
      }
    }

    return (

      <div>
        <p>The correct answer was: <b>{this.props.game.correctMove.title}</b></p>
        <p>You answered: <b>{this.props.game.playerMove.title}</b></p>
        <p>Your opponenets answered:</p>
        <p>{opponentMoveElements}</p>
        {statusMessage}
        <hr />
      </div>
    )
  }
});

module.exports = GameResult;