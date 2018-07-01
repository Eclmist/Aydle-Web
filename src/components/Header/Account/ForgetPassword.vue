<template>
  <div>
    <h1 class="title is-5 has-text-centered has-text-weight-light">
      Reset Password      
    </h1>

    <p class="subtitle is-6 has-text-centered has-text-weight-light">
      We will send instructions to reset your password to your email.
    </p>

    <form @submit.prevent="resetPw">
      <b-field>
          <b-input
              type="email"
              v-model="email"
              placeholder="Email"
              icon="email"
              size="is-medium"
              required>
          </b-input>
      </b-field>

      <button @click.prevent="resetPw" class="button reset is-fullwidth is-primary">
        <span>Reset Password</span>
      </button>
    </form>

    <p class="has-text-centered has-text-grey-light is-size-7">
      Go back to  <a @click.prevent="$emit('login')">Log In</a>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: ''
    }
  },
  created () {},
  mounted () {
  },
  methods: {
    resetPw () {
      this.$emit('reset', this.email)
    }
  }
}
</script>

<style scoped>
.title
{
  /* margin-bottom: 0.5em; */
}
</style>