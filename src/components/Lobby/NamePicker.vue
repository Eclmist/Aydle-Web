<template>
  <div class="section has-text-centered">
    <h1 class="title is-4 has-text-white">
      Choose a nickname
    </h1>
    <form @submit.prevent>
      <input type="text" class="input is-medium" placeholder="Display Name" v-model="targetName" maxlength="20">
      <button class="button is-medium is-fullwidth is-primary is-primary is-outlined" v-on:click="attemptJoinLobbyWithName" v-bind:class="{'is-loading': isLoading}">Continue as {{ targetName }}</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      targetName: '',
      isLoading: false
    }
  },
  methods: {
    attemptJoinLobbyWithName () {
      this.$emit('setName', this.targetName)
    }
  }
}
</script>

<style>
.section
{
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.section > *
{
}

.section > form > *
{
  margin-bottom: 20px;
}

</style>
