<template>
  <div>
    <nav :style="{ 'background-color': 'transparent' }" class="navbar is-info is-fixed-top">
      <div class="navbar-brand">
        <a class="navbar-item" @click="loginModalActive = true">
          <b-icon icon="account"/>
          <figure id="avatar" class="image is-32x32" v-if="isSignedIn">
            <img v-bind:src="avatar" alt="avatar" height="32">
          </figure>
          <span class="username">{{ username }}</span>
        </a>
        <a role="button" class="navbar-burger has-text-white has-text-centered" @click="showSidepanel = !showSidepanel">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      
      <div class="navbar-menu" id="nav-menu">
        <div class="navbar-end">
          <a href="#" class="navbar-item">
              Host a Lobby
          </a>
        </div>
      </div>
    </nav>

    <b-modal :active.sync="loginModalActive" has-modal-card>
      <account-modal v-if="loginModalActive" />      
    </b-modal>

    <side-drawer v-bind:is-open="showSidepanel" @drawerClosed="showSidepanel=false"></side-drawer>
  </div>
</template>

<script>
import Drawer from './Drawer'
import Account from './Account/Account'

export default {
  data () {
    return {
      previousFrameWindowYOffset: 0,
      scrollDelta: 0,
      navbarPos: 0,
      loginModalActive: false,
      showSidepanel: false
    }
  },
  created () {
    window.addEventListener('scroll', this.scrollEvent)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollEvent)
  },
  components: {
    'side-drawer': Drawer,
    'account-modal': Account
  },
  methods: {
    scrollEvent () {
      this.scrollDelta = window.pageYOffset - this.previousFrameWindowYOffset

      this.navbarPos = Math.min(0, Math.max(-51, (this.navbarPos - this.scrollDelta)))

      // this.navbarPos = 10000

      // dont touch
      this.previousFrameWindowYOffset = window.pageYOffset
    },
    changeModalState (target) {
      this.loginModalState = target
    }
  },
  computed: {
    username () {
      if (this.$store.state.user === null) {
        return 'Sign In'
      }
      return this.$store.state.user.name
    },
    avatar () {
      if (this.$store.state.user === null) {
        return ''
      }
      return this.$store.state.user.avatar
    },
    isSignedIn () {
      return (this.$store.state.user !== null)
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

.md-right
{
  z-index: 100;
  background-color: white;
}

.navbar-burger > span
{
  width: 3px;
  height: 3px;
  border-radius: 50%;
  left: calc(50% - 3px);
}

#avatar
{
  position: absolute;
  width: 32px;
  height: 32px;
}

#avatar > img
{
  position: absolute;
  top: 2px;
  left: -2px;
  width: 28px;
  padding: 0;
  margin: 0;
}
</style>
