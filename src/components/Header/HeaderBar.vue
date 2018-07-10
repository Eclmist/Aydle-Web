<template>
  <div class="header">
    <nav :style="{ 'background-color': 'transparent' }" class="navbar is-info">
      <div class="navbar-brand"
        ref="menuBtn">
        <a class="navbar-item" @click="accountModalActive = true">
          <b-icon icon="account-circle"/>
          <figure id="avatar" class="image is-32x32" 
            v-if="$store.getters.isSignedIn &&
            $store.getters.photoURL !== null">
            <img v-bind:src="$store.getters.photoURL" alt="avatar">
          </figure>
          <span class="username">{{ $store.getters.username }}</span>
        </a>
        <a role="button" :class="{ 'is-active': menuActive }" 
          @click="menuActive = !menuActive" 
          class="navbar-burger has-text-white has-text-centered" 
          data-target="nav-menu">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      
      <div ref="dropdownMenu" class="navbar-menu" id="nav-menu" :class="{ 'is-active': menuActive}">
        <div class="navbar-end">
          <a @click="hostLobby" class="navbar-item">
            Host a Lobby
          </a>
        </div>
      </div>
    </nav>

    <email-verification></email-verification>

    <b-modal :active.sync="accountModalActive" has-modal-card>
      <account-modal v-if="accountModalActive" />      
    </b-modal>
  </div>
</template>

<script>
import Drawer from './Drawer'
import Account from './Account/Account'
import EmailVerification from './Account/EmailVerification'

export default {
  created () {
    document.addEventListener('click', this.documentClick)
  },
  destroyed () {
    document.removeEventListener('click', this.documentClick)
  },
  data () {
    return {
      accountModalActive: false,
      menuActive: false
    }
  },
  components: {
    'side-drawer': Drawer,
    'account-modal': Account,
    'email-verification': EmailVerification
  },
  methods: {
    documentClick (e) {
      let menuBtn = this.$refs.menuBtn

      let target = e.target
      if (target !== menuBtn && !menuBtn.contains(target)) {
        this.menuActive = false
      }
    },
    hostLobby () {
      this.$router.push({
        name: 'Host',
        params: {
          isHost: true,
          id: 'id'
        }
      })
    }
  }
}
</script>


<style scoped>
.username
{
  margin-left: 10px;
}

a.navbar-item:hover
{
  background-color: rgba(0,0,0,0.05) !important;
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
  top: 0px;
  left: -6.5px;
  width: 32px !important;
  height: 32px !important;
  max-height: 32px !important;
  padding: 0;
  margin: 0;
  border-radius: 50%;
}

</style>
