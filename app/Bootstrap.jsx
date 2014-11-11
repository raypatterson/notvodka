/**
 * @jsx React.DOM
 */

var React = require('react');

var App = require('./App.jsx');

if (typeof window !== 'undefined') {

  // Render App on client
  window.onload = function() {
    var data = JSON.parse(document.getElementById('game-data').innerHTML);
    var state = data ? data.state : {};
    React.renderComponent(
      <App state={state} />,
      document.getElementById('game-app')
    );

    // Bind Socket event listeners
    require('./controllers/SocketController')(window);
  }
}