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

var MatchType = require('../routes/Enum').MatchType;

var GameArena = React.createClass({

  render: function() {

    return (
      <Locations path={this.props.path}>
        <Location 
          path={MatchType.GAME_FIELD} 
          handler={GameField} 
        />
        <Location 
          path={MatchType.GAME_PODIUM} 
          handler={GamePodium} 
        />
      </Locations>
    );
  }
});

module.exports = GameArena;