/* eslint-disable no-unused-vars */
export default class RoomManager {
  constructor (clientSocket) {
    let tempCode
    let tempPlayerID

    RoomManager.prototype.joinRoom = function (code, playerID) {
      tempCode = code
      clientSocket.initSocketConnection(tryJoinRoom)
    }

    function tryJoinRoom () {
      clientSocket.getSocket().emit('requestJoin', tempCode)
    }

    RoomManager.prototype.hostRoom = (playerID) => {
      tempPlayerID = playerID
      clientSocket.initSocketConnection(tryHostRoom)
    }

    function tryHostRoom () {
      clientSocket.getSocket().emit('requestHost', tempPlayerID)
    }

    RoomManager.prototype.SetName = name => {
      clientSocket.getSocket().emit('enterRoomAs', name)
    }
  }
}
