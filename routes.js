'use strict';

var React = require('react');

//For requiring `.jsx` files as Node modules
require('node-jsx').install({
  extension: '.jsx'
});

var App = require('./app/App.jsx');

var GameStore = require('./app/stores/GameStore');

var ArenaController = require('./app/controllers/ArenaController');

var url = require('url');

var Routes = {

  default: function(req, res) {
    // Redirect to default route
    res.redirect('/arena');
  },

  podium: function(req, res) {

    // res.send(true);
  },

  arena: function(req, res) {

    try {

      ArenaController.getInitialStateAsync(function(state) {

        // Get path for router
        var path = url.parse(req.url).pathname;

        // Render ./app/views/index
        res.render('index', {

          // Render markup with React
          markup: React.renderToString(App({

            // Seed App view with state for 
            // all other views on _server_
            state: state,
            path: path
          })),

          // Pass state to template so it
          // may be retrieved for rendering
          // views on _client_ (./app/Bootstrap)
          data: JSON.stringify({
            state: state,
            path: path
          })
        });
      });

    } catch (err) {

      return next(err);
    }
  }
};

module.exports = Routes;