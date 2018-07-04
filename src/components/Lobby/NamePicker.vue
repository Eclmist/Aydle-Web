<template>
  <div class="section has-text-centered">
    <h1 class="title is-1 has-text-white has-text-weight-light">
      Nickname
    </h1>
    <p class="subtitle has-text-white has-text-weight-light">
      Choose a display name
    </p>
    <br>
    <form @submit.prevent>
      <input id="name-input" class="input is-medium has-text-centered" :placeholder="finalName()" v-model="nameInput" maxlength="20">
      <button 
        class="button is-medium is-fullwidth is-primary is-outlined" v-on:click="attemptJoinLobbyWithName">
        Continue as <br v-show="finalName().length > 8"> {{ finalName() }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['previousName'],
  data () {
    return {
      nameInput: ''
    }
  },
  mounted () {
    document.getElementById('name-input').focus()
    let lobbyID = this.$route.params.id

    if (this.previousName !== '') {
      this.nameInput = prevName
      this.attemptJoinLobbyWithName()
    }
  },
  methods: {
    attemptJoinLobbyWithName () {
      this.$emit('setName', this.nameInput)
    },
    finalName () {
      if (this.nameInput !== '') {
        return this.nameInput
      }

      return this.$store.getters.username.substr(0, 20)
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
  padding: 0;
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

.button
{
  line-height: 1.2rem;
  padding: 0 auto;
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
