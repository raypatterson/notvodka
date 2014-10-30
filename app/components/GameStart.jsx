/**
 * @jsx React.DOM
 */

var React = require('react');
var Reflux = require('reflux');

var GameStore = require('../stores/GameStore');
var GameActions = require('../actions/GameActions');

var GameStart = React.createClass({

  mixins: [Reflux.connect(GameStore)],

  getInitialState: function() {

    return GameStore.getInitialState();
  },

  onClick: function(event) {

    event.preventDefault();

    GameActions.startGame();

    return false;
  },

  render: function() {

    if (this.state.isGameActive) {

      return null;
    } else {

      return (

        <div className="row">
          <div className={"col-md-4"}>
            <button
              type="button" 
              className={"btn btn-lg btn-default " + (this.state.isGameActive ? "disabled" : "")} 
              onClick={this.onClick}>
              Start a new game
            </button>
          </div>
        </div>
      )
    }
  }
});

module.exports = GameStart;