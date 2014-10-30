/**
 * @jsx React.DOM
 */

var React = require('react');

var GameStart = require('./GameStart.jsx');
var GameArena = require('./GameArena.jsx');
var GamePlayed = require('./GamePlayed.jsx');
var GameArchive = require('./GameArchive.jsx');

var GameApp = React.createClass({

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
    )
  }
});

module.exports = GameApp;