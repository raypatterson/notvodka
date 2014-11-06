var React = require('react');

//For requiring `.jsx` files as Node modules
require('node-jsx').install({
  extension: '.jsx'
});

var App = require('./app/App.jsx');
var StateController = require('./app/controllers/StateController');

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

      console.log('req.body.move', req.body.move);

      if (!req.body.hasOwnProperty('move')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
      }

      res.json(true);
    }
  }
};

module.exports = Routes;