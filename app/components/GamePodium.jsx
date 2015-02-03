/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Reflux = require('reflux');

var GameStore = require('../stores/GameStore');

var GameStart = require('./GameStart.jsx');
var GameResult = require('./GameResult.jsx');
var GameAccount = require('./GameAccount.jsx');

var GamePodium = React.createClass({

  mixins: [Reflux.connect(GameStore)],

  render: function() {

    if (this.state.isGameComplete) {

      return (
        <div className="row">
        <div className={"col-md-12"}>
          <GameStart />
          <GameResult />
          <hr />
          <GameAccount />
        </div>
      </div>
      );

    } else {

      return null;
    }
  }
});

module.exports = GamePodium;