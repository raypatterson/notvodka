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

    GameActions.playGame(event.target.dataset.id);

    return false;
  },

  render: function() {

    if (this.state.isGameActive) {

      var self = this;

      var moveButtonElements = this.state.potentialMoves.map(function(option) {
        return (
          <button data-id={option._id} onClick={self.onClick} type="button" className="btn btn-lg btn-default">{option.title}</button>
        );
      });

      return (

        <div className="row">
          <div className={"game-arena col-md-4"}>
            <div>{moveButtonElements}</div>
          </div>
        </div>
      )
    } else {

      return null;
    }
  }
});

module.exports = GameArena;