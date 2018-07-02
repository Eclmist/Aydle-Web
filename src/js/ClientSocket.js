// Handles all socket related stuff for the client
import io from 'socket.io-client'

export default class ClientSocket {
  /* eslint-disable no-unused-vars */
  constructor (callbacks) {
    var socket
    // a reference to every object that defines the socket handlers
    var socketHandlerGroup = []

    // duck type interface
    /*
    var IHandler = function (obj) {
    let i = 1, methodName;
    while ((methodName = arguments[i++])) {
      if (typeof obj[methodName] != 'function') {
        return false;
      }
    }
    return true;
  }
  */
    ClientSocket.prototype.getSocket = function () {
      return socket
    }

    ClientSocket.prototype.subscribe = function (group) {
      socketHandlerGroup.push(group)
    }

    ClientSocket.prototype.initSocketConnection = (callback) => {
      socket = io('52.187.52.94', {})
      // socket = io('http://localhost:2000/')
      socket.on('onConnected', callback)

      socket.on('onPeerUpdate', playerObject => {
        callbacks.onPeerUpdate(playerObject)
      })

      socket.on('onJoinFail', () => {
        callbacks.onFailure()
      })

      // When the user has successfully hosted a room
      socket.on('onHostCode', roomObject => {
        callbacks.onHost(roomObject)
      })
    }
  }
}
