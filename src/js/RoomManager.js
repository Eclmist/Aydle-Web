/* eslint-disable no-unused-vars */
function RoomManager (clientSocket) {
  var tempCode = ''

  RoomManager.prototype.JoinRoom = function (code) {
    clientSocket.InitSocketConnection()

    // store the code temporarily
    tempCode = code.toLowerCase()
    TryJoinRoom()
  }

  function TryJoinRoom () {
    if (!clientSocket.GetSocket().connected) {
      window.setTimeout(TryJoinRoom, 1000)
    } else {
      clientSocket.GetSocket().emit('requestJoin', tempCode)
    }
  }

  RoomManager.prototype.HostRoom = () => {
    clientSocket.InitSocketConnection()
    TryHostRoom()
  }

  function TryHostRoom () {
    if (!clientSocket.GetSocket().connected) {
      window.setTimeout(TryHostRoom, 1000)
    } else {
      clientSocket.GetSocket().emit('requestHost')
    }
  }

  RoomManager.prototype.SetName = name => {
    clientSocket.GetSocket().emit('enterRoomAs', name)
  }
} // end RoomManager
