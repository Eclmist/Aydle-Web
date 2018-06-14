<template>
  <div>
    <h1 class="title is-5 has-text-weight-light has-text-centered">
      Create your free Aydle account
    </h1>

    <div class="level">
      <a href="" class="button btn-google is-medium is-fullwidth">
        <span class="icon">
          <img width="18" src="/static/img/icons/identity/google/google-32.png" alt="google icon">
        </span>
        <span>Sign up with Google</span>
      </a>
    </div>

    <div class="level">
      <a href="" class="button btn-facebook is-medium is-fullwidth">
        <b-icon class="icon" icon="facebook-box" />
        <span>Sign up with Facebook</span>
      </a>
    </div>
    

    <div class="level">
      <a href="" class="button btn-email is-primary is-fullwidth">
        <b-icon class="icon" icon="email" />
        <span>Sign up with Email</span>
        </a>
    </div>

    <div class="has-text-centered or">
      <hr />
      <div class="or-span">OR</div>
      <hr />
    </div>

    <div class="level">
      <a @click.prevent="$emit('showLogin')" class="button btn-email is-success is-fullwidth">
        <!-- <b-icon class="icon" icon="email" /> -->
        <span>Already have an account?</span>
        </a>
    </div>

    <p class="has-text-centered has-text-weight-light has-text-grey-light is-size-7">
      By signing up, you agree to Aydle's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
      <br>
    </p>
  </div>
</template>

<script>
// import firebase from 'firebase'
export default {
  data () {
    return {
      authType: ''
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: Roboto;
  src: url(/static/font/Roboto-Medium.ttf);
}

.button
{
  padding: 8px !important;
  font-size: 14px !important;
  height: 46px;

}

.btn-google
{
  font-family: Roboto !important;
  color: rgba(0, 0, 0, .54);
}

.btn-facebook
{
  background-color: #4267b2;
  color: white;
}

.icon
{
  margin-right: 1em !important;
}

.or
{
  margin: 20px 0 !important;
  display: flex;
}

.or > hr, div
{
  flex: 1;
  flex-basis: auto;

  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  /* border-style: inset;
  border-width: 1px;
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;

  border-color: rgba(0, 0, 0, 0.54) */
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

.btn-login
{
  padding-top: 1rem;
}
</style>
