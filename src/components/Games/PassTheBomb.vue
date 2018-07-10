<template>
  <div class="content">
    <h1 class="title has-text-white">Pass the bomb</h1>
    <h1
      v-show="isMyTurn" 
      class="float title has-text-white">
      Target Number: {{ targetNumber }} 
    </h1>
    <h1 v-if="endText !== ''">{{ endText }}</h1>
    <div class="section">
      <figure class="image is-128x128">
        <img v-if="isMyTurn" :src="bombUrl" alt="">
      </figure>
      <progress 
        class="progress is-danger is-small" 
        :value="normalizedTimeLeft" 
        v-show="isMyTurn"
        max="1">
      </progress>
    </div>
    <div class="columns is-mobile">
      <div class="column">
        <button 
          @click="generate" 
          :disabled="!isMyTurn" 
          class="button is-fullwidth is-success">
          Generate: {{ myNumber }}
        </button>
      </div>
      <div class="column">
        <button 
        @click="pass" 
        :disabled="!canPass()"
        class="button is-fullwidth is-danger">
          Pass
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gameObject: {},
    clientSocket: {}
  },
  data () {
    return {
      socket: {},
      bombUrl: '',
      isMyTurn: false,
      normalizedTimeLeft: 1,
      actualTimeLeft: 1,
      currentTime: 1,
      targetNumber: 99,
      myNumber: 0,
      endText: ''
    }
  },
  mounted () {
    this.bombUrl = 'https://gifimage.net/wp-content/uploads/2017/07/bomb-gif-1.gif'
    this.socket = this.clientSocket.getSocket('lobby')

    this.socket.on('PassBomb', (playerWithBomb, timeLeft, newTargetNumber) => {
      if (playerWithBomb === this.$store.getters.uid) {
        this.isMyTurn = true
        this.actualTimeLeft = timeLeft
        this.currentTime = timeLeft
        this.targetNumber = newTargetNumber
      } else {
        this.isMyTurn = false
      }
    })

    this.socket.on('newRandomNumber', number => {
      this.myNumber = number
    })

    this.socket.on('explode', () => {
      if (this.isMyTurn) {
        this.bombUrl = 'http://pngimg.com/uploads/explosion/explosion_PNG15401.png'
      } else {
        this.endText = 'You Win!'
      }
    })

    this.date = new Date()

    setInterval(this.update, 33)
  },
  methods: {
    generate () {
      this.socket.emit('generate')
    },
    pass () {
      this.socket.emit('pass', this.currentTime, this.myNumber)
    },
    update () {
      if (this.isMyTurn) {
        this.currentTime -= 0.033
        this.normalizedTimeLeft = this.currentTime / this.actualTimeLeft
      }
    },
    canPass () {
      if (!this.isMyTurn) {
        return false
      }

      return this.targetNumber === this.myNumber
    }
  }
}
</script>

<style scoped>
.section {
  width: 100%;
  max-height: 50vh;
}

.button
{
  width: 120px;
  height: 80px;
}

.float
{
  position: absolute;
}

img
{
  width: 100%;
  height: 100%;
}
</style>
