/* eslint-disable no-unused-vars */
export default class RoomManager {
  constructor (clientSocket) {
    const LOBBY_SOCKET = 'lobby'
    const AYDLE_LOBBY_API = 'https://api.aydle.com'

    clientSocket.createNewSocket(LOBBY_SOCKET)

    RoomManager.prototype.joinRoom = function (code, playerID, callback) {
      clientSocket.initSocketConnection(LOBBY_SOCKET, AYDLE_LOBBY_API,
        function () {
          clientSocket.getSocket(LOBBY_SOCKET).emit('requestJoin', code, playerID, callback)
        })
    }

    RoomManager.prototype.hostRoom = (playerID, lobbyName, callback) => {
      clientSocket.initSocketConnection(LOBBY_SOCKET, AYDLE_LOBBY_API,
        function () {
          clientSocket.getSocket(LOBBY_SOCKET).emit('requestHost', playerID, lobbyName, callback)
        })
    }

    RoomManager.prototype.setName = (name, callback) => {
      clientSocket.getSocket(LOBBY_SOCKET).emit('setName', name, callback)
    }
  }
}
