/* eslint-disable */
// Handles all socket related stuff for the client 
function ClientSocket() {

  var socket;
  // a reference to every object that defines the socket handlers
  var socketHandlerGroup = [];

  // duck type interface
  var IHandler = function (obj) {
    let i = 1, methodName;
    while ((methodName = arguments[i++])) {
      if (typeof obj[methodName] != 'function') {
        return false;
      }
    }
    return true;
  }

  ClientSocket.prototype.GetSocket = function () {
    return socket;
  }

  ClientSocket.prototype.Subscribe = function (group) {
    socketHandlerGroup.push(group);
  }

  ClientSocket.prototype.InitSocketConnection = (callback) => {
    socket = io('https://aydle-api.azurewebsites.net/');

    socket.on('onConnected', callback);

    // When a user has set his name
    // Use this to update the client's player list
    socket.on('notifyJoin', function (nameOfClient, roomCode) {
      // CODE GOES HERE ****
      alert(nameOfClient + ' has joined room ' + roomCode);


    });


    // When the user successfully connects but have not set his name yet
    // User gets an array of other players and himself
    socket.on('onJoin', function (otherUsers, playerSelf) {
      // CODE GOES HERE ****
      let allUsers = "";
      otherUsers.forEach(element => {

        allUsers += element.name;

        if (element.playerID === playerSelf.playerID)
          allUsers += ' (you)';

        allUsers += 'n';
      });
      alert('you have joined nnPlayers in room:n' + allUsers);

    });

    socket.on('onJoinFail', function () {
      // CODE GOES HERE ****

      alert('failed to join');

    });


    // When the user has successfully hosted a room
    socket.on('onHostCode', function (code) {

      // CODE GOES HERE ****

      alert('code for room is : ' + code);
    });
  }
}