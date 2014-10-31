/**
 * @jsx React.DOM
 */

var React = require('react');
var Reflux = require('reflux');

var GameStore = require('../stores/GameStore');

var GameResult = require('./GameResult.jsx');

var GamePlayed = React.createClass({

  mixins: [Reflux.connect(GameStore)],

  getInitialState: function() {

    return GameStore.getInitialState();
  },

  render: function() {

    if (this.state.isGamePlayed) {

      return (
        <div className="row">
          <div className={"col-md-12"}>
            <h2 className="h3">Game Results</h2>
            <GameResult key={this.state.activeGame._id} game={this.state.activeGame} />
          </div>
        </div>
      );
    } else {

      return null;
    }
  }
});

module.exports = GamePlayed;