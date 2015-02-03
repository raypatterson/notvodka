'use strict';

var React = require('react');

//For requiring `.jsx` files as Node modules
require('node-jsx').install({
  extension: '.jsx'
});

var RouteType = require('./RouteType');

var App = React.createFactory(require('../App.jsx'));

var StateController = require('../controllers/StateController');

var url = require('url');

var RoutesHandler = function(app) {

  var handlers = {

    default: function(req, res) {
      // Redirect to default route
      res.redirect(RouteType.GAME_FIELD);
    },

    podium: function(req, res) {

      // res.send(true);
    },

    arena: function(req, res) {

      try {

        StateController.getInitialStateAsync(function(state) {

          var props = {
            state: state,
            path: url.parse(req.url).pathname,
            history: true
          };

          // Render ./app/views/index
          res.render('index', {

            // Render markup with React
            markup: React.renderToString(App(

              // Seed App view with state for 
              // all other views on _server_
              props
            )),

            // Pass state to template so it
            // may be retrieved for rendering
            // views on _client_ (./app/Bootstrap)
            data: JSON.stringify(props)
          });
        });

      } catch (err) {

        return next(err);
      }
    },

    error: {

      pageNotFound: function(req, res, next) {
        var err = new Error('Page Not Found');
        err.status = 404;
        next(err);
      },

      development: function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      },

      production: function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: {}
        });
      }
    }
  };

  app.get(RouteType.GAME_FIELD, handlers.arena);
  app.get(RouteType.GAME_PODIUM, handlers.podium);
  app.get(RouteType.DEFAULT, handlers.default);

  // Catch 404, forward to error handler
  app.use(handlers.error.pageNotFound);

  // // Development error handler, will print stacktrace
  if (app.get('env') === 'development') {
    app.use(handlers.error.development);
  }

  // // Production error handler, no stacktraces leaked to user
  app.use(handlers.error.production);
};

module.exports = RoutesHandler;