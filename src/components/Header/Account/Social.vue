<template>
  <div>
    <or :text=compDividerText></or>
    <div class="social">
      <a @click="signInWithGoogle" class="button media-btn btn-google is-medium is-outlined">
        <img width="18" src="/static/img/icons/identity/google/google-32.png" class="icon" alt="google icon">
        <span>{{ googleBtnText }}</span>
      </a>

      <a @click="signInWithFacebook" class="button media-btn btn-facebook is-medium is-info">
        <b-icon class="icon" icon="facebook-box" style="margin:0"/>
        <span>
          {{ facebookBtnText }}
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import Or from './Or'
import firebase from 'firebase'
export default {
  props: {
    'dividerText': String
  },
  components: {
    'or': Or
  },
  methods: {
    signInWithGoogle () {
      var provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider).then(result => {
        this.onSignInSuccess()
      }).catch(error => {
        var errorMessage = error.message

        this.$snackbar.open({
          message: errorMessage,
          type: 'is-danger',
          queue: false
        })
      })
    },
    onSignInSuccess () {
      this.$snackbar.open({
        message: 'Signed in successfully',
        type: 'is-success'
      })
      this.$parent.$parent.$parent.close()
    },
    signInWithFacebook () {
      var provider = new firebase.auth.FacebookAuthProvider()

      firebase.auth().signInWithPopup(provider).then(result => {
        this.onSignInSuccess()
      }).catch(error => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          this.$snackbar.open({
            message: 'An account with the associated email already exist. Please sign in with email and password.',
            type: 'is-danger',
            queue: false,
            duration: 5000
          })

          return
        }

        var errorMessage = error.message

        this.$snackbar.open({
          message: errorMessage,
          type: 'is-danger',
          queue: false
        })
      })
    }
  },
  computed: {
    compDividerText () {
      return this.dividerText === undefined ? 'OR' : this.dividerText
    },
    googleBtnText () {
      if (this.$store.getters.isSignedIn) {
        // TODO: CHECK PROVIDER AVAILABILITY
        return 'Connected'
      } else {
        return 'Google'
      }
    },
    facebookBtnText () {
      if (this.$store.getters.isSignedIn) {
        // TODO: CHECK PROVIDER AVAILABILITY
        return 'Connected'
      } else {
        return 'Facebook'
      }
    }
  }
}
</script>


<style scoped>
@font-face {
  font-family: Roboto-Medium;
  src: url(/static/fonts/Roboto-Medium.ttf);
}

.social
{
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.social > a
{
  flex: 1;
}

.icon
{
  margin-right: 0.5rem !important;
}

.btn-google
{
  font-family: Roboto-Medium !important;
  color: rgba(0, 0, 0, .54);
  margin-right: 1rem;
}

.btn-facebook
{
  font-family: Roboto-Medium !important;
  background-color: #4267b2 !important;
  color: white;
}

.media-btn
{
  padding: 8px !important;
  font-size: 14px !important;
}
</style>
