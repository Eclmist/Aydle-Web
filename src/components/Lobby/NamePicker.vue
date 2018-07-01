<template>
  <div class="section has-text-centered">
    <h1 class="title is-1 has-text-white has-text-weight-light">
      Pick <br> a nickname
    </h1>
    <br>
    <form @submit.prevent>
      <input class="input is-medium has-text-centered" :placeholder="finalName()" v-model="nameInput" maxlength="20" :disabled="isLoading">
      <button 
        class="button is-medium is-fullwidth is-primary is-primary is-outlined" v-on:click="attemptJoinLobbyWithName" 
        v-bind:class="{'is-loading': isLoading}">
        Continue as <br v-show="finalName().length > 8"> {{ finalName() }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    'isLoading': Boolean
  },
  data () {
    return {
      nameInput: ''
    }
  },
  methods: {
    attemptJoinLobbyWithName () {
      this.$emit('setName', this.finalName())
    },
    finalName () {
      if (this.nameInput !== '') {
        return this.nameInput
      }

      return this.$store.getters.username
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
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5)
}

.section > form > *
{
  margin-bottom: 20px;
  height: 50px !important;
}

.button
{
  line-height: 1rem;
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
