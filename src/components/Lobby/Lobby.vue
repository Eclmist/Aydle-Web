<template>
  <div class="section">
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
</template>

<script>
export default {
  data () {
    return {
      lobbyCode: '',
      lobbyName: '',
      hostName: '',
      players: []
    }
  },
  created () {
    let room = this.$route.query.data
    this.lobbyCode = room.code
    this.players = room.players
    this.hostName = room.players[0].name
    this.lobbyName = this.hostName + '\'s Lobby'

    if (this.$store.getters.socket === null ||
      this.$store.getters.socket.connected === false) {
      this.$router.push({
        path: '/'
      })

      // if room doesnt exist
      this.$snackbar.open({
        message: 'The invite link is invalid or has already expired',
        type: 'is-info'
      })
    }
  }
}
</script>

<style scoped>
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
