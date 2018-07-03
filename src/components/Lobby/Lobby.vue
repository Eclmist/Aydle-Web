<template>
  <div class="content">
    <b-loading is-full-page :active.sync="isLoading" />
    <transition name="fade" enter-active-class="fadeIn" leave-active-class="">
      <router-view
        v-show="!isLoading"
        @failure="onJoinRoomFailure"
        @setName="setName"
        @hostLobby="hostLobby"
        :lobby-object=lobbyObject
        ></router-view>
    </transition>
  </div>
</template>

<script>
import ClientSocket from '@/js/ClientSocket'
import RoomManager from '@/js/RoomManager'

export default {
  data () {
    return {
      isLoading: true,
      lobbyObject: {},
      clientSocket: {},
      roomManager: {}
    }
  },
  created () {
    this.initRoomManager()
    // if trying to host a lobby
    if (this.$route.params.isHost === true) {
      this.isLoading = false
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
        onPeerUpdate: this.onPeerUpdate,
        onFailure: this.onJoinRoomFailure
      })
      this.roomManager = new RoomManager(this.clientSocket)
    },
    onJoinRoomSuccess (lobbyObject, socket) {
      this.$store.commit('setSocketConnectionObject', socket)
      this.lobbyObject = lobbyObject
      this.isLoading = false
    },
    onJoinRoomFailure (message) {
      this.$router.push({
        path: '/'
      })

      // if room doesnt exist
      this.$snackbar.open({
        message: message,
        type: 'is-info'
      })
    },
    setName (name) {
      this.roomManager.setName(name, () => {
        this.$router.push({
          name: 'LobbyMain',
          params: {displayName: name}
        })
        this.isLoading = false
      })
    },
    hostLobby (name) {
      this.roomManager.hostRoom(this.$store.getters.uid, name)
    },
    onPeerUpdate (player) {
      for (let i = 0; i < this.lobbyObject.players.length; i++) {
        if (this.lobbyObject.players[i].playerID === player.playerID) {
          if ('hasDisconnected' in player) {
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
          return
        }
      }

      // player does not exist
      this.lobbyObject.players.push(player)
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
