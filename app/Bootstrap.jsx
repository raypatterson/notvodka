/**
 * @jsx React.DOM
 */

var React = require('react');

var App = require('./App.jsx');

var GameStore = require('./stores/GameStore');

if (typeof window !== 'undefined') {

  // Render App on client
  window.onload = function() {

    // Retreive JSON data object from DOM
    var data = JSON.parse(document.getElementById('game-data').innerHTML);

    // Or not... 
    var state = data ? data.state : {};

    // Render component view with React
    React.renderComponent(

      // Seed App view with state for 
      // all other views on _client_
      <App state={state} />,

      // Bind to DOM
      document.getElementById('game-app')
    );

    // Bind Socket event listeners
    require('./controllers/SocketController')();
  }
}