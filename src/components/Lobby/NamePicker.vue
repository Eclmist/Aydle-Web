<template>
  <div>
    <form @submit.prevent>
      <div class="input-group columns is-variable is-mobile">
        <div class="column">
          <input type="text" class="input" placeholder="Display Name" v-model="targetName" maxlength="20">
        </div>
      </div>
      <button class="button is-fullwidth is-primary is-primary is-outlined" v-on:click="attemptJoinLobbyWithName" v-bind:class="{'is-loading': isLoading}">Continue as {{ targetName }}</button>
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

</style>
