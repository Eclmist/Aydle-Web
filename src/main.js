// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import Firebase from 'firebase'
import Lodash from 'vue-lodash'
import 'buefy/lib/buefy.css'
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
    user: null
  },
  mutations: {
    onUserStateChanged (state, user) {
      state.user = user
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
