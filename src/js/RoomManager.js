/* eslint-disable no-unused-vars */
function RoomManager (clientSocket) {
  let tempCode
  let tempPlayerID
  RoomManager.prototype.JoinRoom = function (code, playerID) {
    tempCode = code
    clientSocket.InitSocketConnection(TryJoinRoom)
  }

  function TryJoinRoom () {
    clientSocket.GetSocket().emit('requestJoin', tempCode)
  }

  RoomManager.prototype.HostRoom = (playerID) => {
    tempPlayerID = playerID
    clientSocket.InitSocketConnection(TryHostRoom)
  }

  function TryHostRoom () {
    clientSocket.GetSocket().emit('requestHost', tempPlayerID)
  }

  RoomManager.prototype.SetName = name => {
    clientSocket.GetSocket().emit('enterRoomAs', name)
  }
} // end RoomManager
