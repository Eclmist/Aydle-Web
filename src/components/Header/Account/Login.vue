<template>
  <div>
    <div class="level">
      <div id="gsignin2" @click="showSignInLoader"></div>
    </div>
    <div class="level">
      <a class="button is-info is-fullwidth">
        <span class="icon">
          <i class="fab fa-facebook"></i>
        </span>
        <span>Facebook</span>
      </a>
    </div>
    <p class="has-text-centered is-7 title has-text-grey">- OR -</p>

    <form @submit.prevent>
      <b-field label="Email">
          <b-input
              type="email"
              :value="email"
              placeholder="you@example.org"
              required>
          </b-input>
      </b-field>

      <b-field label="Password">
          <b-input
              type="password"
              :value="password"
              placeholder="********"
              required>
          </b-input>
      </b-field>
      <a href="#" @click.prevent="signUp" class="forget-pw is-pulled-left is-size-7">
              Don't have an account yet?
      </a>
      <a href="#" @click.prevent="forget" class="forget-pw is-pulled-right has-text-right is-size-7">forgot?</a>
      <br>

      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
          </div>
        </div>
        <div class="level-right">
          <button class="button is-primary">Login</button>
        </div>
      </div>
    </form>
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      email: '',
      password: ''
    }
  },
  created () {},
  mounted () {
  },
  methods: {
    showSignInLoader () {
      this.isLoading = true
    },
    signUp () {
      this.$emit.changeState('change-modal-state', 'SignUp')
    }
  }
}
</script>

<style scoped>

.modal-content 
{
  /* min-height: 365.5px !important; */
  overflow: visible !important;
}

.forget-pw
{
  position: relative;
  top: -8px;
}

#signup
{
  position: relative;
  top: -16px
}
</style>

