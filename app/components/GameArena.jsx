/**
 * @jsx React.DOM
 */

var React = require('react');
var Reflux = require('reflux');

var GameStore = require('../stores/GameStore');
var GameActions = require('../actions/GameActions');

var GameArena = React.createClass({

  mixins: [Reflux.connect(GameStore)],

  getInitialState: function() {

    return GameStore.getInitialState();
  },

  onClick: function(event) {

    event.preventDefault();

    GameActions.playGame(event.target.dataset.type);

    return false;
  },

  render: function() {

    if (this.state.isGamePlayed) {

      return null;

    } else {

      var self = this;

      var gameButtonElements = this.state.potentialMoves.map(function(option) {
        return (
          <button data-type={option.type} onClick={self.onClick} type="button" className="btn btn-lg btn-default">{option.title}</button>
        );
      });

      var statusStyle = {
        width: (this.state.game.progress * 100) + "%"
      };

      return (

        <div className="row">
          <div className="game-arena col-md-12">
            <div className="game-buttons">{gameButtonElements}</div>
            <div className="game-progress-message">
              <p>A new game will begin in {this.state.game.secondsRemaining} seconds</p>
            </div>
            <div className="game-progress-bar">
              <div className="game-progress-total"></div>
              <div className="game-progress-elapse" style={statusStyle}></div>
            </div>
          </div>
        </div>
      )
    }
  }
});

module.exports = GameArena;