<template>
  <div class="section has-text-centered">
    <h1 class="title is-2 has-text-white has-text-weight-light">
      Choose a nickname
    </h1>
    <br>
    <form @submit.prevent>
      <input class="input is-medium has-text-centered" :placeholder="finalName()" v-model="nameInput" maxlength="20">
      <button 
        :style="{ height : buttonHeight() }" 
        class="button is-medium is-fullwidth is-primary is-primary is-outlined" v-on:click="attemptJoinLobbyWithName" 
        v-bind:class="{'is-loading': isLoading}">
        Continue as <br v-show="finalName().length > 8"> {{ finalName() }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nameInput: '',
      isLoading: false
    }
  },
  methods: {
    attemptJoinLobbyWithName () {
      this.$emit('setName', this.targetName)
    },
    finalName () {
      if (this.nameInput !== '') {
        return this.nameInput
      }

      return this.$store.getters.username
    },
    buttonHeight () {
      return this.finalName().length > 8 ? '3rem !important' : '46px !important'
    }
  }

}
</script>

<style scoped>
.section
{
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.input.is-medium
{
  padding-left: 9px !important
}

.section > h1
{
  transition: 1s;
}

.section > form > *
{
  margin-bottom: 20px;
}

.button
{
  line-height: 1rem;
  padding: 0 auto;
}

@media screen and (max-height: 480px) {
  h1 {
    opacity: 0.6;
  }
}
</style>
