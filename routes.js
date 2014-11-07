var React = require('react');

//For requiring `.jsx` files as Node modules
require('node-jsx').install({
  extension: '.jsx'
});

var App = require('./app/App.jsx');
var StateController = require('./app/controllers/StateController');
var ArenaController = require('./app/controllers/ArenaController');

var Routes = {

  index: function(req, res) {

    StateController.getInitialStateAsync(function(state) {

      res.render('index', {
        markup: React.renderComponentToString(App({
          state: state
        })),
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

      var state = ArenaController.addMove(req.body.moveType);

      console.log('state', state);

      res.json(true);
    }
  }
};

module.exports = Routes;