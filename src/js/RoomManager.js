/* eslint-disable no-unused-vars */
export default class RoomManager {
  constructor (clientSocket) {
    const LOBBY_SOCKET = 'lobby'
    const AYDLE_LOBBY_API = 'https://api.aydle.com'

    clientSocket.createNewSocket(LOBBY_SOCKET)
    let tempCode
    let tempPlayerID
    let tempLobbyName

    RoomManager.prototype.joinRoom = function (code, playerID) {
      tempCode = code
      tempPlayerID = playerID
      clientSocket.initSocketConnection(LOBBY_SOCKET, AYDLE_LOBBY_API, tryJoinRoom)
    }

    function tryJoinRoom () {
      clientSocket.getSocket(LOBBY_SOCKET).emit('requestJoin', tempCode, tempPlayerID)
    }

    RoomManager.prototype.hostRoom = (playerID, lobbyName) => {
      tempPlayerID = playerID
      tempLobbyName = lobbyName
      clientSocket.initSocketConnection(LOBBY_SOCKET, AYDLE_LOBBY_API, tryHostRoom)
    }

    function tryHostRoom () {
      clientSocket.getSocket(LOBBY_SOCKET).emit('requestHost', tempPlayerID, tempLobbyName)
    }

    RoomManager.prototype.setName = (name, callback) => {
      clientSocket.getSocket(LOBBY_SOCKET).emit('setName', name, callback)
    }
  }
}
