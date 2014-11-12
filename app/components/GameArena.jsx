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

    GameActions.move(event.target.dataset.type);

    return false;
  },

  render: function() {

    if (this.state.isGameComplete) {

      return null;

    } else {

      var self = this;

      var moveButtons = this.state.potentialMoves.map(function(option) {
        return (
          <button 
            data-type={option.type} 
            key={option.type} 
            onClick={self.onClick} 
            type="button" 
            className="btn btn-lg btn-default"
            >{option.title}</button>
        );
      });

      var width = this.state.time ? (this.state.time.progress * 100) : 0;

      var statusStyle = {
        width: width + "%"
      };

      var progressMessage = function(state) {
        if (state.time) {
          return <p className="h5">A new game will begin in {state.time.seconds} seconds</p>;
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

module.exports = GameArena;