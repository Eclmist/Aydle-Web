<template>
  <div class="content">
    <name-picker 
      v-if="!namePicked" 
      :is-loading="namePickerLoad" 
      @setName="setNameAndJoinLobby"/>
    <transition name="fade" enter-active-class="fadeIn" leave-active-class="none">
      <div v-if="namePicked" class="section lobby">
        <div class="wrapper">
          <p class="has-text-centered has-text-white">
            code: 
            <span class="is-uppercase">
              {{ lobbyID }}
            </span>
          </p>
          <h1 class="title is-3 has-text-white has-text-weight-light has-text-centered">
            {{ lobbyName }}
          </h1>
        </div>
        <div class="tags-container">
          <transition-group appear name="zoomUp" tag="div" class="tags">
            <div v-for="(player, index) in players" :key="index" 
            class="pulse tags player-tag" :class="{ 'has-addons': player.isHost }">
              <span v-if="player.isHost" class="tag is-medium is-warning">
                <b-icon icon="star" size="is-small" />
              </span>
              <span class="tag is-medium" :class="{'is-primary': player === self, 'is-info': player !== self}">
                {{ player.name }}
              </span>
            </div>
          </transition-group>
        </div>

        <button v-if="self.isHost" id="start-game-btn" class="button is-medium is-fullwidth is-primary">
          <span>Start Game!</span>
        </button>
        <div class="has-text-centered" v-if="!self.isHost">
          <span class="has-text-white has-text-centered">
            Waiting for players
          </span>
          <div class="spinner2">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
import NamePicker from './NamePicker'
import ClientSocket from '@/js/ClientSocket'
import RoomManager from '@/js/RoomManager'
import GUID from '@/js/GUID'
export default {
  data () {
    return {
      namePicked: false,
      namePickerLoad: false,
      lobbyID: '',
      lobbyName: '',
      hostName: '',
      players: [],
      self: {}
    }
  },
  created () {
    let lobbyId = this.$route.params.id
    this.lobbyID = lobbyId

    // check if lobby id is valid
    if (lobbyId.length > 4) {
      this.onJoinRoomFailure()
      return
    }

    if (this.$store.getters.routeParams !== '') {
      this.$store.commit('setRouteParams', '')
    } else {
      // Check for debug lobby
      if (lobbyId === '2711') {
        this.setNameAndJoinLobby('Debugger')
        return
      }
      // check if lobby is valid again, to account for people entering
      // aydle.com/lobby/code directly (invite links, etc)
      let res = new XMLHttpRequest()
      let url = 'https://api.aydle.com/room/' + lobbyId
      res.open('GET', url, true)
      res.send()

      res.onreadystatechange = () => {
        if (res.readyState === 4 && res.status === 200) {
          let responseObject = JSON.parse(res.responseText)
          if (responseObject.result === true) {
            // Room exists
          } else {
            this.onJoinRoomFailure()
          }
        }
      }
    }
  },
  methods: {
    setNameAndJoinLobby (name) {
      this.namePickerLoad = true

      if (this.lobbyID === '2711') {
        this.self = {name: name, playerID: this.$store.getters.uid, isHost: true}
        this.onJoinRoomSuccess({
          players: [this.self]
        }, {})
        setInterval(() => {
          let guid = GUID.guid()
          this.onPeerUpdate({name: guid, playerID: guid, isHost: false})
        }, 300)
      } else {
        this.establishConnectionToLobbyServer(name)
      }
    },
    onJoinRoomSuccess (lobbyObject, socket) {
      this.namePicked = true
      this.namePickerLoad = false
      this.$store.commit('setSocketConnectionObject', socket)

      this.players = lobbyObject.players
      this.hostName = lobbyObject.players[0].name
      this.lobbyID = lobbyObject.code
      this.lobbyName = this.hostName + '\'s Lobby'

      this.players.forEach(element => {
        if (element.uid === this.$store.getters.uid) {
          this.self = element

          if (lobbyObject.isPlaying === true) {
            this.self.isSpectator = true
          }
        }
      })
    },
    onPeerUpdate (player) {
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i].playerID === player.playerID) {
          if ('hasDisconnected' in player) {
            this.players.splice(i, 1)
            return
          }

          // SocketID
          this.players[i].socketID = ('socketID' in player) ? player.socketID : this.players[i].socketID

          // Is Host
          this.players[i].isHost = ('isHost' in player) ? player.isHost : this.players[i].isHost

          // Score
          this.players[i].score = ('score' in player) ? player.score : this.players[i].score

          // name
          this.players[i].name = ('name' in player) ? player.name : this.players[i].name
          return
        }
      }

      // player does not exist
      this.players.push(player)
    },
    onJoinRoomFailure () {
      this.$router.push({
        path: '/'
      })

      // if room doesnt exist
      this.$snackbar.open({
        message: 'The invite link is invalid or has already expired',
        type: 'is-info'
      })
    },
    establishConnectionToLobbyServer (name) {
      let clientSocket = new ClientSocket({
        onJoin: this.onJoinRoomSuccess,
        onPeerUpdate: this.onPeerUpdate,
        onFailure: () => {
          this.$router.push({
            path: '/'
          })
          this.$snackbar.open({
            message: 'Something went wrong! Please try again later',
            type: 'is-info'
          })
        }
      })
      let roomManager = new RoomManager(clientSocket)

      if (this.$store.getters.routeParams === 'host') {
        roomManager.hostRoom(this.$store.getters.uid, name)
      } else {
        roomManager.joinRoom(this.lobbyID, this.$store.getters.uid, name)
      }
    }
  },
  components: {
    'name-picker': NamePicker
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

.lobby
{
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 0 1.5rem !important;
}

.lobby > .button
{
  flex-shrink: 0; 
  align-self: flex-end;
}

.tags-container
{
  max-width: 800px;
  min-width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center !important;
  overflow-y: auto;

  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,0))
}

.tags
{
  justify-content: center !important;
}

.player-tag
{
  margin: 5px;
}
.wrapper > h1, p
{
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  margin-top: 0;
}

#start-game-btn
{
  width: 280px !important;
  align-self: center;
}

/* Spinners */

.spinner2 {
  margin: 0 auto;
  width: 50px;
  text-align: center;
}

.spinner2 > div {
  width: 8px;
  height: 8px;
  background-color: #fff;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner2 .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>
