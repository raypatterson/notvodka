/**
 * @jsx React.DOM
 */

'use strict';

var logger = require('./utils/logger')('App');

var React = require('react');

var GameStore = require('./stores/GameStore');

/* *************************************************************
 *
 * Begin GameRouter Notes
 *
 */

var GameRouterComponent = require('./components/GameRouter.jsx').Component;

/* 
 * GameRouter exposes the 'navigate' function of
 * a link element from the React Router Component.
 *
 * E.g. require('./components/GameRouter.jsx').navigate
 *
 * Doc recomendation: http://strml.viewdocs.io/react-router-component
 *
 *   "Alternatively, if you have a reference to a router
 *    component instance, you can call its .navigate(href)
 *    method to do a transition to a different location.
 *    You can acquire a reference to a router by using
 *    React's Refs mechanism."
 *
 * The exposed function is used in the GameStore.
 *
 * End GameRouter Notes
 *
 * **************************************************************/

var GamePlayer = require('./components/GamePlayer.jsx');
var GameArena = require('./components/GameArena.jsx');

var App = React.createClass({

  getInitialState: function getInitialState() {

    GameStore.setInitialState(this.props.state);

    return null;
  },

  render: function render() {

    return (

      <div className="game-container">

        <GameRouterComponent />

        <div className="row header">
          <div className="col-md-12 page-header">
            <h1>Is it Vodka?</h1>
          </div>
        </div>

        <GameArena path={this.props.path} />
        
        <GamePlayer path={this.props.path} />

      </div>
    );
  }
});

module.exports = App;