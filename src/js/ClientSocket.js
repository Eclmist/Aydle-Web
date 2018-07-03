// Handles all socket related stuff for the client
import io from 'socket.io-client'

export default class ClientSocket {
  /* eslint-disable no-unused-vars */
  constructor (callbacks) {
    var socket
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
    ClientSocket.prototype.createNewSocket = function (socketName) {
      if (socketCollection[name] === undefined) {
        let newSocket = {} // create an empty object
        socketCollection[name] = newSocket
      } else {
        console.log('cant create socket ' + socketName + ' if it already exist!')
      }
    }

    ClientSocket.prototype.getSocket = function (socketName) {
      return socketCollection[socketName]
    }

    ClientSocket.prototype.initSocketConnection = (socketName, connectionAddress, callback) => {
      if (socketCollection[socketName] !== undefined) {
        socket = io(connectionAddress, {})
        // socket = io('http://localhost:2000/')

        // YP's own callback, dont touch
        socket.on('onConnected', callback)

        socket.on('onPeerUpdate', playerObject => {
          callbacks.onPeerUpdate(playerObject)
        })

        // on your ownself join
        socket.on('onJoin', roomObject => {
          callbacks.onJoin(roomObject, this.socket)
        })

        socket.on('onJoinFail', () => {
          callbacks.onFailure()
        })

        // When the user has successfully hosted a room
        socket.on('onHostCode', roomObject => {
          callbacks.onHost(roomObject)
        })
      } else {
        console.log('the socket ' + socketName + ' does not exist!')
      }
    }
  }
}
