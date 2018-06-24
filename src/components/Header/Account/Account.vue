<template>
  <div class="modal-card">
    <section class="modal-card-body">

      <login-modal 
        v-if="compModalState === 'Login'" 
        @signup="modalState = 'SignUp'"
        @forget="modalState = 'Forget'"
        @signin="emailSignIn"
      />

      <signup-modal 
        v-if="compModalState === 'SignUp'" 
        @showLogin="modalState = 'Login'" 
        @signup="signUp"
        @validateEmail="validateEmail"
        @validationLoad="setValidationLoader"
        v-bind="signupValidation"
      />

      <forgetpw-modal 
        v-if="compModalState === 'Forget'" 
        @login="modalState = 'Login'"
        @reset="onPasswordReset"
      />

      <profile-modal 
        v-if="compModalState === 'Profile'"
        @logout="logout"
      />

    </section>
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
import Login from './Login'
import SignUp from './SignUp'
import ForgetPw from './ForgetPassword'
import Profile from './Profile'

import firebase from 'firebase'

export default {
  data () {
    return {
      modalState: 'Login',
      isLoading: false,
      signupValidation: {
        'emailTooltip': '',
        'emailTooltipType': '',
        'isLoading': false
      }
    }
  },
  components: {
    'login-modal': Login,
    'signup-modal': SignUp,
    'forgetpw-modal': ForgetPw,
    'profile-modal': Profile
  },
  methods: {
    setValidationLoader () {
      this.signupValidation.isLoading = true
    },
    signUp (email, password) {
      this.isLoading = true

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          let tempDisplayName = email.substr(0, email.indexOf('@'))
          firebase.auth().currentUser.sendEmailVerification()
          firebase.auth().currentUser.updateProfile({
            displayName: tempDisplayName
          }).then(() => {
            this.$store.commit('changeDisplayName', tempDisplayName)
            this.isLoading = false
            this.$parent.close()
            this.$snackbar.open({
              message: 'Account created successfully!',
              type: 'is-success'
            })
          })
        })
        .catch(function (error) {
          if (error.code === 'auth/weak-password') {
            self.signupValidation = {

            }
          } else if (error.code === 'auth/invalid-email') {
            self.signupValidation = {
              'emailTooltip': 'Email is invalid!',
              'emailTooltipType': 'is-danger'
            }
          }
          self.isLoading = false
        })
    },
    validateEmail (email) {
      if (email === '') {
        this.signupValidation.emailTooltip = ''
        this.signupValidation.emailTooltipType = ''
        this.signupValidation.isLoading = false
        return
      }

      if (this.checkEmailFormat(email) === false) {
        this.signupValidation.emailTooltip = 'This email is invalid!'
        this.signupValidation.emailTooltipType = 'is-danger'
        this.signupValidation.isLoading = false
        return
      }

      firebase.auth().fetchSignInMethodsForEmail(email)
        .then((values) => {
          if (values[0] !== undefined) {
            this.signupValidation.emailTooltip = 'This email is already in use!'
            this.signupValidation.emailTooltipType = 'is-warning'
          } else {
            this.signupValidation.emailTooltip = ''
            this.signupValidation.emailTooltipType = 'is-success'
          }
          this.signupValidation.isLoading = false
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-email') {
            this.signupValidation.emailTooltip = 'This email is invalid!'
            this.signupValidation.emailTooltipType = 'is-danger'
            this.signupValidation.isLoading = false
          }
        })
    },
    checkEmailFormat (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    emailSignIn (email, pw) {
      let self = this
      this.isLoading = true
      // firebase.auth().currentUser.updateProfile({
      //   displayName: 'Eclmist',
      //   photoURL: 'https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/df/05/13/df051372-bcfc-bacb-ea96-c54a498ab50c/source/256x256bb.jpg'
      // })

      firebase.auth().signInWithEmailAndPassword(email, pw).then(function () {
        self.isLoading = false
        self.onSignInSuccess()
      }).catch(function (error) {
        if (error.code === 'auth/user-disabled') {
          self.$snackbar.open({
            message: 'This account has been disabled',
            type: 'is-danger',
            queue: false
          })
        } else {
          self.$snackbar.open({
            message: 'Email or password is incorrect',
            type: 'is-danger',
            queue: false
          })
        }
        self.isLoading = false
      })
    },
    onSignInSuccess () {
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
    },
    logout () {
      firebase.auth().signOut()
      this.$snackbar.open({
        message: 'Succesfully logged out',
        type: 'is-info'
      })
      this.$parent.close()
    }
  },
  computed: {
    compModalState () {
      if (this.$store.getters.isSignedIn) {
        return 'Profile'
      } else {
        return this.modalState
      }
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
