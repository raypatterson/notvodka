/**
 * @jsx React.DOM
 */

'use strict';

var logger = require('./utils/logger')('Bootstrap');

var React = require('react');

var App = require('./App.jsx');

if (typeof window !== 'undefined') {

  // Add Bootstrap
  window.jQuery = window.$ = require('jquery');
  require('bootstrap-sass/assets/javascripts/bootstrap');
  require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
  // Add styles
  require('./sass/styles.scss');

  // Render App on _client_
  window.onload = function onload() {

    // Retreive JSON data object from DOM
    var data = JSON.parse(document.getElementById('game-data').innerHTML);

    // Or not... 
    var state = data ? data.state : {};
    var path = data ? data.path : '/';
    var history = data ? data.history : true;

    // Render component view with React
    React.render(

      // Seed App view with state for 
      // all other views on _client_
      <App 
        state={state} 
        path={path} 
        history={history} 
      />,

      // Bind to DOM
      document.getElementById('game-app')
    );
  }
}