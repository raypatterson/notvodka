/**
 * @jsx React.DOM
 */

var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

var GameStore = require('../stores/GameStore');

var GameResult = require('./GameResult.jsx');

var GameArchive = React.createClass({

  mixins: [Reflux.connect(GameStore)],

  getInitialState: function() {

    return GameStore.getInitialState();
  },

  render: function() {

    var games = _.toArray(this.state.games);

    if (this.state.isGameActive && games.length > 0) {

      var gameElements = games.map(function(game) {

        return (
          <GameResult key={game._id} game={game} player={this.state.player} />
        );
      });

      return (
        <div className="row">
          <div className={"col-md-12"}>
            <h2 className="h3">Game Archive</h2>
            {gameElements}
          </div>
        </div>
      );
    } else {

      return null;
    }
  }
});

module.exports = GameArchive;