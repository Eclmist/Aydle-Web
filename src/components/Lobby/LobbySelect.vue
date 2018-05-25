<template>
  <transition appear name="slide-fade-down">
    <section class="section">
      <div v-on:keyup="customFocus" v-on:keydown.delete="customFocusDelete" class="input-group columns is-1 is-variable is-mobile">
        <div class="column">
          <input type="text" v-model="code[0]" maxlength="1" class="input c0 is-uppercase" placeholder="C">
        </div>
        <div class="column">
          <input type="text" v-model="code[1]" maxlength="1" class="input c1 is-uppercase" placeholder="O">
        </div>
        <div class="column">
          <input type="text" v-model="code[2]" maxlength="1" class="input c2 is-uppercase" placeholder="D">
        </div>
        <div class="column">
          <input type="text" v-model="code[3]" maxlength="1" class="input c3 is-uppercase" placeholder="E">
        </div>
      </div>
      <button class="button is-fullwidth is-inverted is-link is-outlined" v-on:click="attemptJoinRoom" v-bind:class="{'is-loading': loading}">Continue as Guest</button>
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
      code: [
        '',
        '',
        '',
        ''
      ],
      loading: false
    }
  },
  methods: {
    customFocus () {
      if (document.activeElement.value === '') {
        return
      }
      if (document.activeElement.parentElement.nextElementSibling !== null) {
        document.activeElement.parentElement.nextElementSibling.firstElementChild.focus()
      }
    },
    customFocusDelete () {
      if (document.activeElement.value !== '') {
        return
      }
      if (document.activeElement.parentElement.previousElementSibling !== null) {
        document.activeElement.parentElement.previousElementSibling.firstElementChild.focus()
      }
    },
    attemptJoinRoom () {
      var roomId = ''
      roomId += this.code[0] + this.code[1] + this.code[2] + this.code[3]
      this.loading = true
      var self = this

      if (roomId.length < 4) {
        setTimeout(function () {
          self.loading = false
          self.$snackbar.open({
            message: 'Invalid room code',
            type: 'is-info',
            position: 'is-bottom-right',
            queue: false
          })
        }, 200)
        return
      }

      setTimeout(function () {
        self.loading = false

        self.$snackbar.open({
          message: 'Cannot find room',
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
