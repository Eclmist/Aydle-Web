// Handles all socket related stuff for the client
import io from 'socket.io-client'

export default class ClientSocket {
  /* eslint-disable no-unused-vars */
  constructor (callbacks) {
    var socketCollection = {}
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
    ClientSocket.prototype.getCallbacks = function () {
      return callbacks
    }

    ClientSocket.prototype.createNewSocket = function (socketName) {
      if (socketCollection[socketName] === undefined) {
        let newSocket = {} // create an empty object
        socketCollection[socketName] = newSocket
      } else {
        console.log('cant create socket ' + socketName + ' if it already exist!')
      }
    }

    ClientSocket.prototype.getSocket = function (socketName) {
      return socketCollection[socketName]
    }

    ClientSocket.prototype.initSocketConnection = (socketName, connectionAddress, callback) => {
      if (socketCollection[socketName] !== undefined) {
        socketCollection[socketName] = io(connectionAddress, {})
        let socket = socketCollection[socketName]

        // YP's own callback, dont touch
        socket.on('onConnected', callback)

        socket.on('onPeerUpdate', playerObject => {
          callbacks.onPeerUpdate(playerObject)
        })

        // Fails if disconnected
        socket.on('disconnect', callbacks.onFailure)
      } else {
        console.log('the socket ' + socketName + ' does not exist!')
      }
    }
  }
}
