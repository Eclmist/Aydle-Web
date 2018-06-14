<template>
  <div class="modal-card">
    <section class="modal-card-body">

      <login-modal 
        v-if="modalState === 'Login'" 
        @signup="modalState = 'SignUp'"
        @signin="emailSignIn"
      />

      <signup-modal 
        v-if="modalState === 'SignUp'" 
        @showLogin="modalState = 'Login'" 
      />

      <forgetpw-modal 
        v-if="modalState === 'Forget'" 
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
    'forgetww-modal': ForgetPw
  },
  methods: {
    emailSignIn (email, pw) {
      this.isLoading = true
      let self = this
      firebase.auth().signInWithEmailAndPassword(email, pw).catch(function (error) {
        if (error.code === 'auth/user-disabled') {
          self.$toast.open({
            message: 'This account has been disabled',
            type: 'is-danger'
          })
        } else {
          self.$toast.open({
            message: 'Username or password is incorrect',
            type: 'is-danger',
            duration: 10000
          })
        }
      })

      self.isLoading = false
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
    onSignInSuccess () {
      this.$emit('close')
    }
  }
}
</script>

<style>
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

.media-btn
{
  padding: 8px !important;
  font-size: 14px !important;
  height: 46px;
}
.or
{
  margin: 10px 0 !important;
  display: flex;
}

.or > hr, div
{
  flex: 1;
  flex-basis: auto;

  /* margin-top: 0.5rem; */
  /* margin-bottom: 0.5rem; */
}

.or > .or-span
{
  flex: 0.5;
  margin-top: auto;
  margin-bottom: auto;
  vertical-align: middle;
  font-size: 12px;
  color: #aaa;
  justify-content: center;
  align-items: center;
}

</style>
