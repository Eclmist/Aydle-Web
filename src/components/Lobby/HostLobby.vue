<template>
  <div class="content">
    <div class="section has-text-centered">
      <h1 class="title is-1 has-text-white has-text-weight-light">
        Host a lobby
      </h1>
      <p class="subtitle has-text-white has-text-weight-light">
        Think of a fun lobby name!
      </p>
      <br>
      <form @submit.prevent>
        <input id="name-input" class="input is-medium has-text-centered" :placeholder="finalName()" v-model="nameInput" maxlength="20">
        <button 
          class="button is-medium is-fullwidth is-primary is-primary is-outlined" v-on:click="hostLobbyWithName">
          Confirm Room Name
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nameInput: ''
    }
  },
  created () {
    // check if user is logged in
    if (this.$store.getters.isSignedIn === false) {
      this.$emit('failure', 'You need to be logged in to host a lobby!')
    }
    // TODO: Check if user is allowed to host lobby
  },
  mounted () {
    document.getElementById('name-input').focus()
  },
  methods: {
    hostLobbyWithName () {
      this.$emit('hostLobby', this.finalName())
    },
    finalName () {
      if (this.nameInput !== '') {
        return this.nameInput
      }

      return this.$store.getters.username.substr(0, 12) + '\'s lobby'
    }
  }

}
</script>

<style scoped>
.section
{
  width: 255px;
  max-width: 255px;
  margin: 0 auto;
  padding: 0 !important;
}

.input.is-medium
{
  padding-left: 9px !important
}

.section > h1, p
{
  transition: 1s;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5)
}

.section > form > *
{
  margin-bottom: 20px;
  height: 50px !important;
}

.section > form
{
  width: 100%;
}

@media screen and (max-height: 480px) {
  h1 {
    opacity: 0.6;
  }
}
</style>
