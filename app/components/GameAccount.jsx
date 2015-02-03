/**
 * @jsx React.DOM
 */

'use strict';

var logger = require('../utils/logger')('GameAccount');

var React = require('react');
var Reflux = require('reflux');

var GameActions = require('../actions/GameActions');

var GameAccount = React.createClass({

  getInitialState: function() {

    return {
      value: null
    };
  },

  handleChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  handleSubmit: function(event) {

    event.preventDefault();

    GameActions.playerLogin(this.refs.playerName.getDOMNode().value);
  },

  render: function() {

    return (

      <div className="game-account">
        <p>Want to keep track of your score?</p>
        <form className="form-inline" role="form">
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              ref="playerName" 
              placeholder="Enter name" 
              maxLength="30" 
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-default" 
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
});

module.exports = GameAccount;