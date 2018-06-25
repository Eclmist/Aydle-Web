// Handles all socket related stuff for the client

import io from 'socket.io-client'

/* eslint-disable no-unused-vars */
function ClientSocket (callbacks) {
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
  ClientSocket.prototype.GetSocket = function () {
    return socket
  }

  ClientSocket.prototype.Subscribe = function (group) {
    socketHandlerGroup.push(group)
  }

  ClientSocket.prototype.InitSocketConnection = (callback) => {
    socket = io('https://api.aydle.com/')
    socket.on('onConnected', callback())

    // When a user has set his name
    // Use this to update the client's player list
    socket.on('notifyJoin', function (playerObjectThatChangedName) {
      callbacks.onOtherPlayerSetName(playerObjectThatChangedName)
    })

    // When the user successfully connects but have not set his name yet
    // User gets the latest updated room object
    socket.on('onJoin', function (roomObject) {
      callbacks.onJoin(roomObject)
    })

    // When the user has successfully hosted a room
    socket.on('onHostCode', function (roomObject) {
      callback.onHost(roomObject)
    })
  }
}
