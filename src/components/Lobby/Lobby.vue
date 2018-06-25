<template>
  <div class="container">
    asdfsdfa
  </div>
</template>

<script>
export default {
  created () {
    // let roomId = this.$route.params.id
    return
    /* eslint-disable no-unreachable */
    if (this.$store.getters.socket === null) {
      this.$router.push({
        path: '/'
      })

      // if room doesnt exist
      this.$snackbar.open({
        message: 'The invite link is invalid or has already expired',
        type: 'is-info'
      })
    }
  }
}
</script>

<style>
.container
{
  height: 100%;
}

</style>
