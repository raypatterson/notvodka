/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Reflux = require('reflux');

var GameStore = require('../stores/GameStore');

var GameStart = require('./GameStart.jsx');
var GameResult = require('./GameResult.jsx');

var GamePodium = React.createClass({

  render: function() {

    console.log('GamePodium.render');

    return (
      <div className="row">
        <div className={"col-md-12"}>
          <GameStart />
          <GameResult />
        </div>
      </div>
    );
  }
});

module.exports = GamePodium;