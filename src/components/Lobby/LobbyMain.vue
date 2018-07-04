<template>
  <div class="content">
    <div class="section lobby">
      <div class="wrapper">
        <p class="has-text-centered has-text-white">
          {{ lobbyObject.lobbyName }}    
        </p>
        <h1 class="title is-3 has-text-white has-text-weight-light has-text-centered">
          Lobby Code: 
          <span class="is-uppercase">
            {{ lobbyObject.lobbyID }}
          </span>
        </h1>
      </div>
      <div class="tags-container">
        <transition-group appear name="zoomUp" tag="div" class="tags">
          <div v-for="(player, index) in lobbyObject.players" :key="index" 
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

      <button 
        v-if="self.isHost" 
        :disabled="!canStartGame()"
        :class="{ 'pulse-btn': canStartGame() }"
        @click="startGame()"
        id="start-game-btn" 
        class="button is-medium is-fullwidth is-primary">
        <span>{{ canStartGame() ? 'Start Game!' : 'Not Enough Players' }}</span>
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
  </div>
</template>

<script>
export default {
  props: {
    lobbyObject: {},
    self: {}
  },
  created () {
    // Check if name has already been set
    if (this.getDisplayName === undefined) {
      this.$router.push({
        name: 'NamePicker'
      })
      return
    }

    if (this.lobbyObject.isPlaying === true) {
      this.startGame()
    }
  },
  methods: {
    getDisplayName () {
      return this.$route.params.displayName
    },
    canStartGame () {
      if (this.lobbyOnject.players.length > 1) {
        return true
      }
      return false
    },
    startGame () {
      if (this.canStartGame()) {
        this.$emit('loadGame')
      }
    }
  }
}
</script>

<style scoped>
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
  padding-top: 2vh;
  padding-bottom: 50px;
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center !important;
  overflow-y: auto;

  -webkit-mask-image: linear-gradient(to bottom,
   rgba(0,0,0,0) 0%,
   rgba(0,0,0,1) 5%,
   rgba(0,0,0,1) 80%,
   rgba(0,0,0,0) 100%)
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

.pulse-btn
{
  animation: btn-pulse 1s linear infinite;
}

@keyframes btn-pulse
{
  0%
  {
    box-shadow: 0 0 0 0 rgba(0, 255, 205, .3)
  }
  40%
  {
    box-shadow: 0 0 0 20px rgba(0, 255, 205, 0)
  }
  80%
  {
    box-shadow: 0 0 0 20px rgba(0, 255, 205, 0)
  }
  100%
  {
    box-shadow: 0 0 0 0 rgba(0, 255, 205, 0)
  }
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
