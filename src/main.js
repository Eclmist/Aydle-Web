// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy, { defaultIconPack: 'fas' })
Vue.config.productionTip = false

// global user data
const user = {
  username: 'Guest',
  userId: 0
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    pageLoaded: false,
    user
  },
  template: '<App/>',
  components: { App }
})

// global onresize form handler
window.onresize = function (event) {
  document.activeElement.scrollIntoView()
}
