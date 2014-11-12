var React = require('react');

//For requiring `.jsx` files as Node modules
require('node-jsx').install({
  extension: '.jsx'
});

var App = require('./app/App.jsx');

var GameStore = require('./app/stores/GameStore');

var ArenaController = require('./app/controllers/ArenaController');

var Routes = {

  index: function(req, res) {

    ArenaController.getInitialStateAsync(function(state) {

      // Render ./app/views/index
      res.render('index', {

        // Render markup with React
        markup: React.renderComponentToString(App({

          // Seed App view with state for 
          // all other views on _server_
          state: state
        })),

        // Pass state to template so it
        // may be retrieved for rendering
        // views on _client_ (./app/Bootstrap)
        data: JSON.stringify({
          state: state
        })
      });
    });
  },

  api: {

    move: function(req, res) {

      if (!req.body.hasOwnProperty('moveType')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
      }

      res.json(ArenaController.getPlayerMove(req.body.moveType));
    }
  }
};

module.exports = Routes;