<template>
  <div>
    <nav :style="{ 'background-color': 'transparent' }" class="navbar is-info is-fixed-top">
      <div class="navbar-brand">
        <a class="navbar-item" v-on:click="loginModalActive = true">
          <b-icon icon="account"/>
          <span class="username">Sign In</span>
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
          <!-- <a href="#" class="navbar-item">
            Logout
          </a> -->
        </div>
      </div>
    </nav>
    <b-modal :active.sync="loginModalActive" has-modal-card>
      <login-modal></login-modal>
    </b-modal>
  </div>
</template>

<script>
import Login from './Login'

export default {
  data () {
    return {
      previousFrameWindowYOffset: 0,
      scrollDelta: 0,
      navbarPos: 0,
      loginModalActive: false,
      burgerEaten: false
    }
  },
  created () {
    window.addEventListener('scroll', this.scrollEvent)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollEvent)
  },
  components: {
    'login-modal': Login
  },
  methods: {
    scrollEvent () {
      this.scrollDelta = window.pageYOffset - this.previousFrameWindowYOffset

      this.navbarPos = Math.min(0, Math.max(-51, (this.navbarPos - this.scrollDelta)))

      // this.navbarPos = 10000

      // dont touch
      this.previousFrameWindowYOffset = window.pageYOffset
    }
  }
}
</script>


<style scoped>
.username
{
  margin-left: 0.5rem;
}

a.navbar-item:hover
{
  background-color: rgba(0,0,0,0.05) !important;
}
</style>
