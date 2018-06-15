<template>
  <div class="modal-card">
    <section class="modal-card-body">

      <login-modal 
        v-if="modalState === 'Login'" 
        @signup="modalState = 'SignUp'"
        @forget="modalState = 'Forget'"
        @signin="emailSignIn"
      />

      <signup-modal 
        v-if="modalState === 'SignUp'" 
        @showLogin="modalState = 'Login'" 
      />

      <forgetpw-modal 
        v-if="modalState === 'Forget'" 
        @login="modalState = 'Login'"
        @reset="onPasswordReset"
      />

    </section>
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
import Login from './Login'
import SignUp from './SignUp'
import ForgetPw from './ForgetPassword'

import firebase from 'firebase'

export default {
  data () {
    return {
      modalState: 'Login',
      isLoading: false
    }
  },
  components: {
    'login-modal': Login,
    'signup-modal': SignUp,
    'forgetpw-modal': ForgetPw
  },
  methods: {
    emailSignIn (email, pw) {
      if (email === '' || pw === '') {
        return
      }

      let self = this
      this.isLoading = true

      firebase.auth().signInWithEmailAndPassword(email, pw).then(function () {
        self.isLoading = false
        self.onSignInSuccess()
      }).catch(function (error) {
        if (error.code === 'auth/user-disabled') {
          self.$snackbar.open({
            message: 'This account has been disabled',
            type: 'is-danger'
          })
        } else {
          self.$snackbar.open({
            message: 'Email or password is incorrect',
            type: 'is-danger'
          })
        }
        self.isLoading = false
      })
    },
    firebaseAuth () {
      // let provider = new firebase.auth.GoogleAuthProvider()

      // firebase.auth().signInWithPopup(provider).then(function (result) {
      //   // This gives you a Google Access Token. You can use it to access the Google API.
      //   var token = result.credential.accessToken
      //   // The signed-in user info.
      //   var user = result.user
      //   // ...
      // }).catch(function(error) {
      //   // Handle Errors here.
      //   var errorCode = error.code
      //   var errorMessage = error.message
      //   // The email of the user's account used.
      //   var email = error.email;
      //   // The firebase.auth.AuthCredential type that was used.
      //   var credential = error.credential;
      // })
    },
    onSignInSuccess (user) {
      this.$snackbar.open({
        message: 'Signed in successfully',
        type: 'is-success'
      })
      this.$parent.close()
    },
    onPasswordReset (email) {
      this.isLoading = true

      var auth = firebase.auth()
      let self = this
      auth.sendPasswordResetEmail(email).then(function () {
        // Email sent.
        self.onPasswordResetSuccess()
      }).catch(function (error) {
        if (error.code === 'auth/user-not-found') {
          self.onPasswordResetSuccess()
          return
        }

        if (error.code === 'auth/invalid-email') {
          self.$snackbar.open({
            message: 'The email is invalid.',
            type: 'is-danger'
          })
        } else {
          self.$snackbar.open({
            message: error.message,
            type: 'is-danger'
          })
        }

        self.isLoading = false
      })
    },
    onPasswordResetSuccess () {
      this.isLoading = false
      this.$snackbar.open({
        message: 'Password reset link sent!',
        type: 'is-info'
      })
      this.$parent.close()
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

.modal-card
{
  max-width: 360px;

  margin-left: auto !important;
  margin-right: auto !important;
}

.modal-card-body
{
  padding: 30px;
}
</style>
