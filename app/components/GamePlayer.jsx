/**
 * @jsx React.DOM
 */

'use strict';

var logger = require('../utils/logger')('GamePlayer');

var React = require('react');

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;

var MatchType = require('../routes/Enum').MatchType;

var GameWelcome = require('./GameWelcome.jsx');
var GameStats = require('./GameStats.jsx');

var GamePlayer = React.createClass({

  render: function() {

    return (

      <Locations path={this.props.path}>

        <Location 
          path={MatchType.GAME_PLAYER} 
          handler={GameStats} 
        />
        <Location 
          path={MatchType.WILDCARD} 
          handler={GameWelcome} 
        />

      </Locations>

    );
  }
});

module.exports = GamePlayer;