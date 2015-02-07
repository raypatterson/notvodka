module.exports = {
  EventType: {
    CONNECT: 'connection',
    DISCONNECT: 'close',
    OPEN: 'open',
    CLOSE: 'close',
    MESSAGE: 'message',
  },
  MessageType: {
    ID: 'id',
    TIC: 'tic',
    BZZ: 'bzz',
    MOVE: 'move',
    MOVE_COMPLETE: 'move_complete',
    LOGIN: 'login',
    LOGIN_COMPLETE: 'login_complete'
  }
}