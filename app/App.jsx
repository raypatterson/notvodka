/**
 * @jsx React.DOM
 */

var React = require('react');

var GameStore = require('./stores/GameStore');

var GameStart = require('./components/GameStart.jsx');
var GameArena = require('./components/GameArena.jsx');
var GamePlayed = require('./components/GamePlayed.jsx');
var GameArchive = require('./components/GameArchive.jsx');

var App = React.createClass({

  getInitialState: function() {

    GameStore.setInitialState(this.props.state);

    return {};
  },

  render: function() {

    return (
      <div className="game-container">
        <div className="row header">
          <div className="col-md-12 page-header">
            <h1>Is it Vodka?</h1>
          </div>
        </div>
        <GameStart />
        <GameArena />
        <GamePlayed />
        <GameArchive />
      </div>
    );
  }
});

module.exports = App;