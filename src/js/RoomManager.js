/* eslint-disable no-unused-vars */
export default class RoomManager {
  constructor (clientSocket) {
    let tempCode
    let tempPlayerID
    let tempName

    RoomManager.prototype.joinRoom = function (code, playerID, name) {
      tempCode = code
      tempPlayerID = playerID
      tempName = name
      clientSocket.initSocketConnection(tryJoinRoom)
    }

    function tryJoinRoom () {
      clientSocket.getSocket().emit('requestJoin', tempCode, tempPlayerID, tempName)
    }

    RoomManager.prototype.hostRoom = (playerID, name) => {
      tempPlayerID = playerID
      tempName = name
      clientSocket.initSocketConnection(tryHostRoom)
    }

    function tryHostRoom () {
      clientSocket.getSocket().emit('requestHost', tempPlayerID, tempName)
    }

    RoomManager.prototype.SetName = name => {
      clientSocket.getSocket().emit('setName', name)
    }
  }
}
