<template>
  <transition appear name="slide-fade-down">
    <section class="section">
      <form v-on:submit.prevent>
        <div @keyup="customFocus" @keydown="maxlengthCheck" @keydown.delete="customFocusDelete" class="input-group columns is-1 is-variable is-mobile animated" v-bind:class="{ blink: errorShake }">
          <div class="column">
            <input type="text" maxlength="1" class="input is-uppercase" placeholder="C">
          </div>
          <div class="column">
            <input type="text" maxlength="1" class="input is-uppercase" placeholder="O">
          </div>
          <div class="column">
            <input type="text" maxlength="1" class="input is-uppercase" placeholder="D">
          </div>
          <div class="column">
            <input type="text" maxlength="1" class="input is-uppercase" placeholder="E">
          </div>
        </div>
        <button class="button is-fullwidth is-inverted is-link is-outlined" v-on:click="attemptJoinRoom" v-bind:class="{'is-loading': loading}">Continue as Guest</button>
      </form>
      <!-- <div class="container">
        <a href="#">Host your own lobby</a>
      </div> -->
    </section>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      errorShake: false
    }
  },
  methods: {
    customFocus () {
      var activeElement = document.activeElement

      if (activeElement.value !== '') {
        activeElement.value = activeElement.value.substring(0, 1)
        if (activeElement.parentElement.nextElementSibling !== null) {
          activeElement.parentElement.nextElementSibling.firstElementChild.focus()
        }
      }
    },
    customFocusDelete () {
      var activeElement = document.activeElement

      if (activeElement.value === '') {
        if (activeElement.parentElement.previousElementSibling !== null) {
          activeElement.parentElement.previousElementSibling.firstElementChild.focus()
        }
      }
    },
    maxlengthCheck () {
      var activeElement = document.activeElement
      activeElement.value = activeElement.value.substring(0, 1)
    },
    attemptJoinRoom () {
      this.errorShake = false
      var roomId = ''
      var inputs = document.getElementsByClassName('input')
      roomId += inputs[0].value
      roomId += inputs[1].value
      roomId += inputs[2].value
      roomId += inputs[3].value
      this.loading = true
      var self = this

      if (roomId.length < 4) {
        setTimeout(function () {
          self.errorShake = true
        }, 50)
        this.loading = false
        this.$snackbar.open({
          message: 'Invalid room code',
          type: 'is-info',
          position: 'is-bottom-right',
          queue: false
        })
        return
      }

      setTimeout(function () {
        self.errorShake = true
        self.loading = false
        self.$snackbar.open({
          message: 'Cannot find room id ' + roomId,
          type: 'is-danger',
          position: 'is-bottom-right',
          queue: false
          // actionText: null
        })
      }, 1000)
    }
  }
}
</script>


<style scoped>
input
{
  padding: 0 0 !important; 

  font-size: 150%;
  text-align: center;
  color: grey;
}

.section
{
  padding-top: 0;

  max-width: 350px;
  min-width: 100px;
  /* margin-left: auto;
  margin-right: auto; */
  width: 72vw;
}

.button
{
  height: 50px;
}

</style>
