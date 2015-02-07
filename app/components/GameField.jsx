/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Reflux = require('reflux');

var GameStore = require('../stores/GameStore');
var GameActions = require('../actions/GameActions');

var GameField = React.createClass({

  mixins: [Reflux.connect(GameStore)],

  clickHandler: function(id) {

    GameActions.playerMove(id);
  },

  render: function() {

    if (this.state.isGameComplete) {

      return null;

    } else {

      var self = this;

      var buttonClasses = "btn btn-lg btn-default" + (self.state.isGamePlayed ? " disabled" : "");

      var moveButtons = this.state.potentialMoves.map(function(option) {
        return (
          <button 
            key={option._id} 
            onClick={self.clickHandler.bind(null, option._id)} 
            type="button" 
            className={buttonClasses}
            >
            {option.title}
            </button>
        );
      });

      var width = this.state.time ? (this.state.time.progress * 100) : 0;

      var statusStyle = {
        width: width + "%"
      };

      var progressMessage = function(state) {
        if (state.time) {
          if (state.isGamePlayed) {
            return <p>Your game will end in {state.time.seconds} seconds</p>;
          } else {
            return <p>A new game will begin in {state.time.seconds} seconds</p>;
          }
        } else {
          return null;
        }
      }(this.state);

      return (

        <div className="row">
          <div className="game-arena col-md-12">
            <div className="game-buttons">{moveButtons}</div>
            <div className="game-progress-message">
              {progressMessage}
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

module.exports = GameField;