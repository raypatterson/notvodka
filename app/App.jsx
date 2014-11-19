/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

// var Router = require('react-router-component');
// var Locations = Router.Locations;
// var Location = Router.Location;

var GameStore = require('./stores/GameStore');

var GameArena = require('./components/GameArena.jsx');
var GamePodium = require('./components/GamePodium.jsx');

var App = React.createClass({

  getInitialState: function() {

    GameStore.setInitialState(this.props.state);

    return {};
  },

  render: function() {

    console.log('this.props.path', this.props.path);

    return (
      <div className="game-container">
        <div className="row header">
          <div className="col-md-12 page-header">
            <h1>Is it Vodka?</h1>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;