<template>
  <div>
    <h1 class="title is-5 has-text-weight-light has-text-centered">
      Account Creation
    </h1>

    <form @submit.prevent="signup">
      <b-field
        :message="emailTooltip"
        :type="emailTooltipType">
          <b-input
              v-model="email"
              placeholder="Email"
              icon="account"
              size="is-medium"
              maxlength="256"
              :has-counter="false"
              :loading="isLoading">
          </b-input>
      </b-field>

      <b-field
        :message="passwordTooltip.tooltip"
        :type="passwordTooltip.type">
        <b-input
            type="password"
            v-model="password"
            placeholder="Password"
            icon="lock"
            size="is-medium"
            maxlength="256"
            :has-counter="false">
        </b-input>
      </b-field>

      <b-field
        :message="password2Tooltip.tooltip"
        :type="password2Tooltip.type">
          <b-input
              type="password"
              v-model="password2"
              placeholder="Confirm password"
              icon="lock"
              size="is-medium"
              maxlength="256"
              :has-counter="false">
          </b-input>
      </b-field>

      <br>

      <div class="level">
        <button @click.prevent="signup" class="button media-btn btn-email is-primary is-fullwidth">
          <span>Sign Up</span>
          </button>
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
  props: {
    'emailTooltip': String,
    'emailTooltipType': String,
    'isLoading': Boolean
  },
  data () {
    return {
      email: '',
      password: '',
      password2: '',
      passwordTooltip: {},
      password2Tooltip: {}
    }
  },
  methods: {
    signup () {
      if (this.passwordTooltip.type !== 'is-success' ||
        this.password2Tooltip.type !== 'is-success' ||
        this.emailTooltipType !== 'is-success') {
        return
      }
      this.$emit('signup', this.email, this.password)
    },
    validateEmail () {
      this.$emit('validateEmail', this.email)
    }
  },
  components: {
    'social-btns': Social
  },
  created () {
    this.validateEmail = this._.debounce(this.validateEmail, 500)
  },
  watch: {
    email: function (newEmail, oldEmail) {
      this.$emit('validationLoad')
      this.validateEmail()
    },
    password: function (newPass, oldPass) {
      if (newPass === '' && oldPass !== '') {
        this.passwordTooltip = {
          tooltip: 'Password cannot be blank!',
          type: 'is-danger'
        }

        return
      }

      if (newPass.length < 6) {
        this.passwordTooltip = {
          tooltip: 'Password needs to be at least 6 characters long',
          type: 'is-danger'
        }
      } else {
        this.passwordTooltip = {
          tooltip: '',
          type: 'is-success'
        }

        if (newPass === this.password2) {
          this.password2Tooltip = {
            tooltip: '',
            type: 'is-success'
          }
        }
      }
    },
    password2: function (newPass, oldPass) {
      if (newPass !== this.password) {
        this.password2Tooltip = {
          tooltip: 'Passwords does not match!',
          type: 'is-danger'
        }
      } else {
        this.password2Tooltip = {
          tooltip: '',
          type: 'is-success'
        }
      }
    }
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
