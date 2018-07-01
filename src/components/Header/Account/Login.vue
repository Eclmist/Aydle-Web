<template>
  <div>
    <h1 class="title is-5 has-text-centered has-text-weight-light">
      Log In      
    </h1>

    <form @submit="signin">
      <b-field
        :message="blankDangerMessage('Email')"
        :type="blankDangerType('Email')">
          <b-input
              placeholder="Email"
              v-model="email"
              icon="account"
              size="is-medium"
              maxlength="256"
              :has-counter="false"
              >
          </b-input>
      </b-field>

      <b-field
        :message="blankDangerMessage('Password')"
        :type="blankDangerType('Password')">
          <b-input
              type="password"
              v-model="password"
              placeholder="Password"
              icon="lock"
              size="is-medium"
              maxlength="256"
              :has-counter="false"
              >
          </b-input>
      </b-field>

      <div class="level-right">
        <a href="#" @click.prevent="$emit('forget')" class="forget-pw is-pulled-right has-text-right is-size-7">Forgot Password?</a>
      </div>

      <div class="level">
        <button @click.prevent="signin" class="is-medium button media-btn btn-email is-primary is-fullwidth">
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
      password: '',
      triedSubmitting: false
    }
  },
  created () {},
  mounted () {
  },
  methods: {
    signin () {
      this.triedSubmitting = true

      if (this.email === '' || this.password === '') {
        return
      } else {
        this.triedSubmitting = false
      }

      this.$emit('signin', this.email, this.password)
    },
    blankDangerType (word) {
      if (this.triedSubmitting === false) {
        return ''
      }
      if (word === 'Email') {
        return this.email === '' ? 'is-danger' : ''
      } else if (word === 'Password') {
        return this.password === '' ? 'is-danger' : ''
      }
    },
    blankDangerMessage (word) {
      if (this.triedSubmitting === false) {
        return ''
      }
      if (word === 'Email') {
        return this.email === '' ? 'Email cannot be blank!' : ''
      } else if (word === 'Password') {
        return this.password === '' ? 'Password cannot be blank!' : ''
      }
    }
  },
  components: {
    'social-btns': Social
  },
  computed: {
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
</style>

