'use strict';

var ConnectionController = require('../controllers/ConnectionController');
var DatabaseController = require('../controllers/DatabaseController');
var PlayerController = require('../controllers/PlayerController');

var ServerAPI = {

  move: function(data) {

    var connection = ConnectionController.getConnectionById(data.connectionId);

    PlayerController.addActivePlayer(data, connection);

    return true;
  },

  login: function(data) {

    logger.debug('login', data);

    DatabaseController.addPlayer(data, function onAddPlayer(databaseDTO) {

      var data = PlayerController.createLoginDTO(databaseDTO.name, databaseDTO._id);

      return data;
    });
  }
};

module.exports = ServerAPI;