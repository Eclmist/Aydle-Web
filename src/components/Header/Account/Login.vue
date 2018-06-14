<template>
  <div>
    <h1 class="title is-5 has-text-centered has-text-weight-light">
      Log In      
    </h1>

    <form @submit="signin">
      <b-field>
          <b-input
              placeholder="Email"
              v-model="email"
              icon="account"
              >
          </b-input>
      </b-field>

      <b-field>
          <b-input
              type="password"
              v-model="password"
              placeholder="Password"
              icon="lock"
              >
          </b-input>
      </b-field>

      <div class="level-right">
        <a href="#" @click.prevent="forget" class="forget-pw is-pulled-right has-text-right is-size-7">Forgot Password?</a>
      </div>

      <div class="level">
        <button @click.prevent="signin" class="button media-btn btn-email is-primary is-fullwidth">
          <span>Log In</span>
        </button>
      </div>
    </form>

    <social-btns></social-btns>
    <p class="has-text-centered has-text-grey-light is-size-7">
      Don't have an account? <a @click.prevent="$emit('signup')">Sign Up</a>
    </p>
  </div>
</template>

<script>
import Social from './Social'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  created () {},
  mounted () {
  },
  methods: {
    signin () {
      this.$emit('signin', this.email, this.password)
    }
  },
  components: {
    'social-btns': Social
  }
}
</script>

<style scoped>
.forget-pw
{
  position: relative;
  top: -8px;
  padding-bottom: 16px;
}

#signup
{
  position: relative;
  top: -16px
}

.button
{
  height: 46px;
}
</style>

