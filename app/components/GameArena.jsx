/**
 * @jsx React.DOM
 */

'use strict';

var logger = require('../utils/logger')('GameArena');

var React = require('react');

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;

var GameField = require('./GameField.jsx');
var GamePodium = require('./GamePodium.jsx');

var RouteType = require('../routes/RouteType');

var GameArena = React.createClass({

  render: function() {

    return (
      <Locations path={this.props.path}>
        <Location 
          path={RouteType.GAME_FIELD + RouteType.WILDCARD} 
          handler={GameField} 
        />
        <Location 
          path={RouteType.GAME_PODIUM + RouteType.WILDCARD} 
          handler={GamePodium} 
        />
      </Locations>
    );
  }
});

module.exports = GameArena;