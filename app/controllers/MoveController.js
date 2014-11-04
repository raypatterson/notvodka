var MoveController = {

  MOVE_LIST: [{
    type: '0',
    title: 'Yes'
  }, {
    type: '1',
    title: 'No'
  }],

  getRandomMove: function() {

    return this.MOVE_LIST[Math.floor(Math.random() * this.MOVE_LIST.length)];
  },

  getMoveByType: function(type) {

    return _.find(this.MOVE_LIST, function(move) {
      return move.type === type;
    });
  }
};

module.exports = MoveController;