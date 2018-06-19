<template>
  <div class="content">
    <b-notification type="is-info" :active.sync="isActive">
      <p v-if="!linkSent" class="has-text-centered">Email address not verified. Please verify your email. 
        <a @click="resendLink()">Resend verification link</a>
      </p>
      <p v-if="linkSent" class="has-text-centered">Verification link sent!</p>
    </b-notification>
  </div>

</template>

<script>
export default {
  data () {
    return {
      linkSent: false,
      activeOverride: false
    }
  },
  methods: {
    resendLink () {
      this.$store.state.firebaseNativeUser.sendEmailVerification()
      this.linkSent = true
      setTimeout(() => {
        this.activeOverride = true
      }, 1000)
    }
  },
  computed: {
    isEmailVerified () {
      return this.$store.getters.isEmailVerified
    },
    isActive () {
      return !this.isEmailVerified && !this.activeOverride
    }
  }
}
</script>

<style scoped>
.content {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
