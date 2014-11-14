/**
 * @jsx React.DOM
 */

var React = require('react');
var Reflux = require('reflux');

var GameStore = require('../stores/GameStore');

var GameStart = require('./GameStart.jsx');
var GameResult = require('./GameResult.jsx');

var GamePodium = React.createClass({

  mixins: [Reflux.connect(GameStore)],

  getInitialState: function() {

    return GameStore.getInitialState();
  },

  render: function() {

    if (this.state.isGameComplete) {

      return (
        <div className="row">
          <div className={"col-md-12"}>
            <h2 className="h3">Game Results</h2>
            <GameStart />
            <GameResult results={this.state.results} />
          </div>
        </div>
      );
    } else {

      return null;
    }
  }
});

module.exports = GamePodium;