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

      var moveButtonElements = this.state.potentialMoves.map(function(option) {
        return (
          <button data-type={option.type} onClick={self.onClick} type="button" className="btn btn-lg btn-default">{option.title}</button>
        );
      });

      return (

        <div className="row">
          <div className={"game-arena col-md-12"}>
            <div>{moveButtonElements}</div>
          </div>
        </div>
      )
    }
  }
});

module.exports = GameArena;