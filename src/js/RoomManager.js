/* eslint-disable no-unused-vars */
export default class RoomManager {
  constructor (clientSocket) {
    const LOBBY_SOCKET = 'lobby'
    const AYDLE_LOBBY_API = 'https://api.aydle.com'

    clientSocket.createNewSocket(LOBBY_SOCKET)
    let tempCode
    let tempPlayerID
    let tempName

    RoomManager.prototype.joinRoom = function (code, playerID, name) {
      tempCode = code
      tempPlayerID = playerID
      tempName = name
      clientSocket.initSocketConnection(LOBBY_SOCKET, AYDLE_LOBBY_API, tryJoinRoom)
    }

    function tryJoinRoom () {
      clientSocket.getSocket(LOBBY_SOCKET).emit('requestJoin', tempCode, tempPlayerID, tempName)
    }

    RoomManager.prototype.hostRoom = (playerID, name) => {
      tempPlayerID = playerID
      tempName = name
      clientSocket.initSocketConnection(LOBBY_SOCKET, AYDLE_LOBBY_API, tryHostRoom)
    }

    function tryHostRoom () {
      clientSocket.getSocket(LOBBY_SOCKET).emit('requestHost', tempPlayerID, tempName)
    }

    RoomManager.prototype.SetName = name => {
      clientSocket.getSocket(LOBBY_SOCKET).emit('setName', name)
    }
  }
}
