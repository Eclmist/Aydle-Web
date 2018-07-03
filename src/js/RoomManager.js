/* eslint-disable no-unused-vars */
export default class RoomManager {
  constructor (clientSocket) {
    const LOBBY_SOCKET = 'lobby'
    const AYDLE_LOBBY_API = 'https://api.aydle.com'

    clientSocket.createNewSocket(LOBBY_SOCKET)

    RoomManager.prototype.joinRoom = function (code, playerID) {
      clientSocket.initSocketConnection(
        LOBBY_SOCKET, AYDLE_LOBBY_API,
        function () {
          clientSocket.getSocket(LOBBY_SOCKET).emit('requestJoin', code, playerID,
            function (roomObject) {
              clientSocket.getCallbacks().onJoin(roomObject, clientSocket.getSocket(LOBBY_SOCKET))
            },
            clientSocket.getCallbacks().onFailure())
        })
    }

    RoomManager.prototype.hostRoom = (playerID, lobbyName) => {
      clientSocket.initSocketConnection(LOBBY_SOCKET, AYDLE_LOBBY_API,
        function () {
          clientSocket.getSocket(LOBBY_SOCKET).emit('requestHost', playerID, lobbyName,
            function (roomObject) {
              clientSocket.getCallbacks().onHost(roomObject)
            })
        })
    }

    RoomManager.prototype.setName = (name, callback) => {
      clientSocket.getSocket(LOBBY_SOCKET).emit('setName', name, callback)
    }
  }
}
