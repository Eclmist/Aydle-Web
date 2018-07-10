<template>
  <div class="content">
    <b-loading is-full-page :active.sync="isLoading" />
    <transition name="fade" enter-active-class="fadeIn" leave-active-class="">
      <router-view
        v-show="!isLoading"
        @failure="onJoinRoomFailure"
        @setName="setName"
        @setLobbyName="setLobbyName"
        @loadGame="loadGame"
        :lobby-object=lobbyObject
        :previous-name=previousName
        :self=self
        :game-object=gameObject
        :client-socket=clientSocket
        ></router-view>
    </transition>
  </div>
</template>

<script>
import ClientSocket from '@/js/ClientSocket'
import RoomManager from '@/js/RoomManager'
// import GameManager from '@/js/GameManager'

export default {
  data () {
    return {
      isLoading: true,
      lobbyObject: {},
      self: {},
      previousName: '',
      clientSocket: {},
      roomManager: {},
      gameManager: {},
      gameObject: {}
    }
  },
  created () {
    this.initRoomManager()
    // if trying to host a lobby
    if (this.$route.params.isHost === true) {
      this.roomManager.hostRoom(this.$store.getters.uid, name)
    } else {
      // else if trying to join lobby
      let lobbyID = this.$route.params.id

      // Check if lobby code is valid
      if (!this.isTargetLobbyValid(lobbyID)) {
        this.onJoinRoomFailure()
        return
      }

      // Actually try joining the server
      this.roomManager.joinRoom(lobbyID, this.$store.getters.uid)
    }
  },
  methods: {
    isTargetLobbyValid (lobbyID) {
    // check if lobby id is valid
      return (lobbyID.length === 4)
    },
    initRoomManager () {
      this.clientSocket = new ClientSocket({
        onJoin: this.onJoinRoomSuccess,
        onHost: this.onHostSuccess,
        onLobbyUpdate: this.onLobbyUpdate,
        onPeerUpdate: this.onPeerUpdate,
        onStartGame: this.onStartGame,
        onFailure: this.onJoinRoomFailure
      })
      this.roomManager = new RoomManager(this.clientSocket)
    },
    onJoinRoomSuccess (name) {
      if (name !== undefined && name !== '') {
        this.previousName = name
      }

      this.isLoading = false
    },
    onHostSuccess (lobbyObject) {
      this.lobbyObject = lobbyObject
      this.onJoinRoomSuccess('')
    },
    onJoinRoomFailure (message) {
      this.$router.push({
        path: '/'
      })

      if (message === '') {
        message = 'Something went wrong! Please try again later.'
      }

      // if room doesnt exist
      this.$snackbar.open({
        message: message,
        type: 'is-info',
        duration: 7000
      })
    },
    setName (name) {
      this.roomManager.setName(name, (success) => {
        if (success) {
          this.$router.push({
            name: 'LobbyMain',
            params: {displayName: name}
          })
          this.isLoading = false
        } else {
          this.onJoinRoomFailure()
        }
      })
    },
    setLobbyName (name) {
      this.roomManager.setLobbyName(name, (success) => {
        if (success) {
          this.$router.push({
            name: 'NamePicker',
            params: {
              displayName: name,
              id: this.lobbyObject.code
            }
          })
          this.isLoading = false
        } else {
          this.onJoinRoomFailure()
        }
      })
    },
    onLobbyUpdate (lobbyObject) {
      this.lobbyObject = lobbyObject

      for (let i = 0; i < lobbyObject.players.length; i++) {
        if (lobbyObject.players[i].playerID === this.$store.getters.uid) {
          this.self = lobbyObject.players[i]
        }
      }
    },
    onPeerUpdate (player) {
      if (this.lobbyObject.players === undefined) {
        return
      }

      for (let i = 0; i < this.lobbyObject.players.length; i++) {
        if (this.lobbyObject.players[i].playerID === player.playerID) {
          if ('hasDisconnected' in player) {
            if (player.playerID === this.$store.getters.uid) {
              if (player.hasDisconnected === 'multiple-clients-detected') {
                this.onJoinRoomFailure('Multiple clients detected!')
              } else {
                this.onJoinRoomFailure('You have been kicked from the lobby.')
              }
              return
            }
            // Other player got disconnected
            this.lobbyObject.players.splice(i, 1)
            return
          }

          // SocketID
          this.lobbyObject.players[i].socketID = ('socketID' in player) ? player.socketID : this.lobbyObject.players[i].socketID

          // Is Host
          this.lobbyObject.players[i].isHost = ('isHost' in player) ? player.isHost : this.lobbyObject.players[i].isHost

          // Score
          this.lobbyObject.players[i].score = ('score' in player) ? player.score : this.lobbyObject.players[i].score

          // name
          this.lobbyObject.players[i].name = ('name' in player) ? player.name : this.lobbyObject.players[i].name

          // is Initialized
          this.lobbyObject.players[i].isInitialized = ('isInitialized' in player) ? player.isInitialized : this.lobbyObject.players[i].isInitialized
          return
        }
      }

      // player does not exist
      this.lobbyObject.players.push(player)
    },
    onStartGame (gameObject) {
      this.$router.push({
        name: gameObject.routeName
      })

      this.gameObject = gameObject
    },
    loadGame () {
      this.roomManager.startDebugGame()
    }
  }
}
</script>

<style scoped>
.content
{
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
