<template>
  <div class="content">
    <name-picker v-if="!namePicked" @setName="setNameAndJoinLobby"/>
    <div v-if="namePicked" class="section">
      <div class="wrapper">
        <p class="has-text-centered has-text-white is-5">
          code: 
          <span class="is-uppercase">
            {{ lobbyCode }}
          </span>
        </p>
        <h1 class="title is-3 has-text-white has-text-centered">
          {{ lobbyName }}
        </h1>
        <div>
          <p class="has-text-white has-text-centered">
            Waiting for players
          </p>
          <div class="spinner2">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </div>
      </div>
      <transition-group appear name="pulse" tag="div" class="tags is-centered">
        <div transition="pulse" v-for="(player, index) in players" :key="index" 
        class="pulse tag is-medium is-info">
          {{ player.name }}
        </div>
      </transition-group>

      <div class="button is-fullwidth is-primary">Start</div>

    </div>
  </div>
</template>

<script>
import NamePicker from './NamePicker'
import ClientSocket from '@/js/ClientSocket'
import RoomManager from '@/js/RoomManager'

export default {
  data () {
    return {
      namePicked: false,
      lobbyCode: '',
      lobbyName: '',
      hostName: '',
      players: []
    }
  },
  created () {
    let lobbyId = this.$route.params.id
    this.lobbyCode = lobbyId

    // check if lobby id is valid
    if (lobbyId.length > 4) {
      this.onJoinRoomFailure()
      return
    }

    if (this.$store.getters.cameFromFrontPage) {
      this.$store.commit('cameFromFrontPage', false)
    } else {
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
      this.namePicked = true
      this.establishConnectionToLobbyServer(name)
    },
    onJoinRoomSuccess (lobbyObject, socket) {
      this.$store.commit('setSocketConnectionObject', socket)

      this.players = lobbyObject.players
      this.hostName = lobbyObject.players[0].name
      this.lobbyName = this.hostName + '\'s Lobby'
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
        onFailed: () => {
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
      roomManager.joinRoom(this.lobbyCode, '0', name)
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
}

.section
{
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.section > .button
{
  flex-shrink: 0; 
  align-self: flex-end;
}

.section > .wrapper
{
  flex: 1;
  flex-grow: 0;
  align-items: flex-end;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-basis: auto;
}

.section > .tags
{
  min-width: 100%;
  align-self: flex-start;
  /* align-items: center; */
  /* justify-content: center; */
  flex-grow: 1;
}

.spinner2 {
  margin: 100px auto 0;
  width: 70px;
  margin-top: 5px;
  text-align: center;
}

.spinner2 > div {
  width: 10px;
  height: 10px;
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
