/**
 * @jsx React.DOM
 */

/**
 *  For rendering the app on client side.
 */
var React = require('react');

var App = require('./App.jsx');

if (typeof window !== 'undefined') {

  window.onload = function() {
    var data = JSON.parse(document.getElementById('game-state').innerHTML);
    var state = data ? data.state : {};
    React.renderComponent(
      <App state={state} />,
      document.getElementById('game-app')
    );
  }
}