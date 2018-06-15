<template>
  <div>
    <h1 class="title is-5 has-text-weight-light has-text-centered">
      Account Creation
    </h1>

    <form @submit.prevent="signup">
      <b-field>
          <b-input
              type="email"
              :value="email"
              placeholder="Email"
              icon="account"
              size="is-medium"
              required>
          </b-input>
      </b-field>

      <b-field>
          <b-input
              type="password"
              :value="password"
              placeholder="Password"
              icon="lock"
              size="is-medium"
              required>
          </b-input>
      </b-field>

      <b-field>
          <b-input
              type="password"
              :value="password"
              placeholder="Confirm password"
              icon="lock"
              size="is-medium"
              required>
          </b-input>
      </b-field>

      <br>

      <div class="level">
        <a @click.prevent class="button media-btn btn-email is-primary is-fullwidth">
          <span>Sign Up</span>
          </a>
      </div>
    </form>

    <social-btns></social-btns>

    <p class="already has-text-centered has-text-grey-light is-size-7">
      Already have an account? <a @click.prevent="$emit('showLogin')">Sign In</a>
    </p>

    <p class="has-text-centered has-text-weight-light has-text-grey-light is-size-7">
      By signing up, you agree to Aydle's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
      <br>
    </p>
  </div>
</template>

<script>
import Social from './Social'

export default {
  data () {
    return {
      authType: ''
    }
  },
  meathods: {
  },
  components: {
    'social-btns': Social
  }
}
</script>

<style scoped>
.already
{
  margin-bottom: 10px;
}

.button
{
  height: 46px;
}
</style>
