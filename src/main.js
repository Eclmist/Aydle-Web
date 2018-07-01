// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import Firebase from 'firebase'
import Lodash from 'vue-lodash'
// import 'bulma/css/bulma.css'
// import 'buefy/lib/buefy.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import 'mdi/css/materialdesignicons.min.css'

var VueCookie = require('vue-cookie')
Vue.use(Vuex)
Vue.use(Buefy)
Vue.use(VueCookie)
Vue.use(Lodash)
// Vue.config.productionTip = false

// firebase
var config = {
  apiKey: 'AIzaSyDIaRQ6qOcExplEdKStJCdddoDN0QyanKc',
  authDomain: 'aydle-1527066873917.firebaseapp.com',
  databaseURL: 'https://aydle-1527066873917.firebaseio.com',
  projectId: 'aydle-1527066873917',
  storageBucket: 'aydle-1527066873917.appspot.com',
  messagingSenderId: '372832993527'
}

Firebase.initializeApp(config)
Firebase.auth().onAuthStateChanged(function (user) {
  store.commit('onUserStateChanged', user)
})

const store = new Vuex.Store({
  state: {
    firebaseNativeUser: {},
    user: {
      isSignedIn: false,
      displayName: '',
      email: '',
      emailVerified: false,
      photoURL: '',
      phoneNumber: ''
    },
    socketConnection: null,
    cameFromFrontPage: false
  },
  mutations: {
    onUserStateChanged (state, user) {
      state.firebaseNativeUser = user

      if (user !== null) {
        state.user = {
          isSignedIn: true,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber
        }
      } else {
        state.user = {
          isSignedIn: false
        }
      }
    },
    changeDisplayName (state, name) {
      state.user.displayName = name
    },
    setSocketConnectionObject (state, socket) {
      state.socketConnection = socket
    },
    cameFromFrontPage (state, val) {
      state.cameFromFrontPage = val
    }
  },
  getters: {
    isSignedIn: state => {
      return state.user.isSignedIn
    },
    photoURL: state => {
      return state.user.isSignedIn ? state.user.photoURL : ''
    },
    email: state => {
      return state.user.isSignedIn ? state.user.email : 'email@example.com'
    },
    username: state => {
      return state.user.isSignedIn ? state.user.displayName : 'Guest'
    },
    groups: state => {
      return [
        ['Admin', 'is-danger'],
        ['Alpha-Tester', 'is-info']
      ]
    },
    isEmailVerified: state => {
      return state.user.isSignedIn ? state.user.emailVerified : true
    },
    socket: state => {
      return state.socketConnection
    },
    cameFromFrontPage: state => {
      return state.cameFromFrontPage
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

// global onresize form handler
window.onresize = function (event) {
  document.activeElement.scrollIntoView()
}
