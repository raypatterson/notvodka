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
    React.renderComponent(
      <App state={JSON.parse(document.getElementById('game-state').innerHTML).state} />,
      document.getElementById('game-app')
    );
  }
}