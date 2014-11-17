'use strict';

var _ = require('lodash');

var MoveController = {

  MOVE_LIST: [{
    _id: 'yes',
    title: 'Yes'
  }, {
    _id: 'no',
    title: 'No'
  }],

  getRandomMove: function() {

    return this.MOVE_LIST[Math.floor(Math.random() * this.MOVE_LIST.length)];
  },

  getMoveById: function(id) {

    return _.find(this.MOVE_LIST, function(move) {
      return move._id === id;
    });
  }
};

module.exports = MoveController;