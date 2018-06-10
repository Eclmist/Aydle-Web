<template>
  <div class="modal-card"> 
    <!-- <header class="modal-card-head">
    </header> -->
    <section class="modal-card-body">
      <div class="level">
        <div id="gsignin2" @click="SignInLoading"></div>
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
        <a href="#" class="forget-pw is-pulled-right has-text-right is-size-7">forgot?</a>
        <br>

        <div class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <a href="#" class="is-size-7">
                more login options
              </a>
            </div>
          </div>
          <div class="level-right">
            <button class="button is-primary">Login</button>
          </div>
        </div>
      </form>
      <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
    </section>
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
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '372832993527-gkhpru5bgqb5sb1g3rejsuvk9edaknuk.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      })

      window.gapi.signin2.render('gsignin2', {
        scope: 'email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'light',
        onsuccess: this.onGoogleSignIn,
        onfailure: this.onSignInFailure
      })
    })
  },
  methods: {
    onGoogleSignIn (googleUser) {
      this.$parent.close()
      this.isLoading = false

      let profile = googleUser.getBasicProfile()

      let uName = profile.getName()
      let uAvatar = new Image()
      uAvatar.src = profile.getImageUrl()
      let uEmail = profile.getEmail()

      let activeUser = {
        name: uName,
        avatar: uAvatar,
        email: uEmail
      }

      this.$store.commit('onGoogleSignIn', activeUser)

      this.$toast.open({
        message: 'Logged in as ' + uName,
        type: 'is-success'
      })
    },
    onSignInFailure () {
      this.$toast.open({
        message: 'Failed to login',
        type: 'is-danger'
      })
      this.isLoading = false
    },
    SignInLoading () {
      this.isLoading = true
    }
  }
}
</script>


<style scoped>
.modal-card-body
{
  padding: 30px;
}

.modal-card
{
  max-width: 360px;

  margin-left: auto !important;
  margin-right: auto !important;

}
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


</style>

