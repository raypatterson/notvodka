/**
 * @jsx React.DOM
 */

'use strict';

var logger = require('../utils/logger')('GamePlayer');

var React = require('react');

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;

var RouteType = require('../routes/RouteType');

var GameWelcome = require('./GameWelcome.jsx');
var GameStats = require('./GameStats.jsx');

var GamePlayer = React.createClass({

  render: function() {

    return (
      <Locations path={this.props.path}>
        <Location 
          path={RouteType.WILDCARD + RouteType.GAME_PLAYER + RouteType.WILDCARD} 
          handler={GameStats} 
        />
        <Location 
          path={RouteType.WILDCARD} 
          handler={GameWelcome} 
        />
      </Locations>
    );
  }
});

module.exports = GamePlayer;