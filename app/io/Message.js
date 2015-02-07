module.exports = {

  send: function send(connection, type, data) {

    // TODO: Why does this need to be accessed?
    var remote = connection.remote;

    remote.send({
      type: type,
      data: data
    });
  }
};