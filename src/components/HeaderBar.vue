<template>
  <div>
    <nav class="navbar is-transparent is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" v-on:click="loginModalActive = true">
          <img src="https://i.stack.imgur.com/HQwHI.jpg">
          <span class="username">Guest</span>
        </a>
        <a role="button" class="navbar-burger has-text-white" v-on:click="burgerEaten = !burgerEaten">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" v-bind:class="{ 'is-active': burgerEaten }" id="nav-menu">
        <div class="navbar-end">
          <a href="#" class="navbar-item">
            Host a lobby
          </a>
          <hr class="navbar-divider">
          <a href="#" class="navbar-item">
            Logout
          </a>
        </div>
      </div>
    </nav>
    <b-modal :active.sync="loginModalActive">
      <login-modal></login-modal>
    </b-modal>
  </div>
</template>

<script>
import Login from './Login'

export default {
  data () {
    return {
      loginModalActive: false,
      burgerEaten: false
    }
  },
  components: {
    'login-modal': Login
  }
}
</script>

<style scoped>

.username
{
  margin-left: 0.5rem;
}


</style>
