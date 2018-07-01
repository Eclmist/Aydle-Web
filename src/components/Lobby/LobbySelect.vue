<template>
  <transition appear name="slide-fade-down">
    <section class="section">
      <form @submit.prevent>
        <div @keyup="customFocus" @keydown="maxlengthCheck" @keydown.delete="customFocusDelete" class="input-group columns is-1 is-variable is-mobile" v-bind:class="{ shake: errorShake }">
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
        <button class="button is-fullwidth is-primary is-primary is-outlined" v-on:click="checkLobbyExists" v-bind:class="{'is-loading': loading}">
          Join Lobby
        </button>
      </form>
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
  computed: {
    displayName () {
      return this.$store.getters.username
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
    onFailedJoinRoom () {
      setTimeout(() => {
        this.errorShake = true
      }, 50)
      this.loading = false
      this.$snackbar.open({
        message: 'Invalid room code',
        type: 'is-danger',
        position: 'is-bottom-right',
        queue: false
      })
    },
    promptDisplayName (code) {
      this.$store.commit('cameFromFrontPage', true)
      this.$router.push({
        path: '/lobby/' + code
      })
    },
    checkLobbyExists () {
      // Getting the target room id
      this.errorShake = false
      var lobbyId = ''
      var inputs = document.getElementsByClassName('input')
      lobbyId += inputs[0].value
      lobbyId += inputs[1].value
      lobbyId += inputs[2].value
      lobbyId += inputs[3].value
      lobbyId = lobbyId.toUpperCase()

      // Setting up animations
      this.loading = true

      // Prelim checks
      if (lobbyId.length < 4) {
        this.onFailedJoinRoom()
      } else {
        if (lobbyId === '2711') {
          this.promptDisplayName(lobbyId)
          return
        }
        // Soft check lobby exists
        let res = new XMLHttpRequest()
        let url = 'https://api.aydle.com/room/' + lobbyId
        res.open('GET', url, true)
        res.send()

        res.onreadystatechange = () => {
          if (res.readyState === 4 && res.status === 200) {
            let responseObject = JSON.parse(res.responseText)
            if (responseObject.result === true) {
              // Room exists, change prompt for displayname
              this.promptDisplayName(lobbyId)
            } else {
              this.onFailedJoinRoom()
            }
          }
        }
      }
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

.nameField
{
  width: 100%;
  height: 46px;
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
