/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Link = require('react-router-component').Link;

var _navigate;

var GameRouter = {

  Component: React.createClass({

    componentDidMount: function() {

      _navigate = this.refs.el.navigate;
    },

    render: function() {
      return (
        <Link ref="el" href="" />
      );
    }
  }),

  navigate: function(href) {
    _navigate(href);
  }
};

module.exports = GameRouter;