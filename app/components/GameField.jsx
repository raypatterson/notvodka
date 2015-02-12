/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var logger = require('../utils/logger')('GameField');

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

      var buttonClasses;
      var sharedButtonClasses = React.addons.classSet({
        'btn btn-lg btn-default': true,
        'disabled': this.state.isGamePlayed
      });

      var moveButtons = this.state.potentialMoves.map(function(option) {

        buttonClasses = self.state.isGamePlayed ? React.addons.classSet({
          'selected': self.state.move._id === option._id
        }) : '';

        return (
          <button 
            key={option._id} 
            onClick={self.clickHandler.bind(null, option._id)} 
            type="button" 
            className={sharedButtonClasses + ' ' + buttonClasses}
            >
            {option.title}
            </button>
        );
      });

      var time = this.state.time;
      var width = time ? time.progress * 100 : 0;

      var statusStyle = {
        width: width + "%"
      };

      var progressMessage = function(state) {


        if (state.time) {

          var seconds = state.time.seconds;

          if (state.isGamePlayed) {
            return <p>Your game will end in {seconds} seconds</p>;
          } else {
            return <p>A new game will begin in {seconds} seconds</p>;
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