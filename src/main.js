// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import VueKonva from 'vue-konva'
import 'buefy/lib/buefy.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import 'mdi/css/materialdesignicons.min.css'

var VueCookie = require('vue-cookie')
Vue.use(Buefy)
Vue.use(VueCookie)
Vue.use(VueKonva)
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// global onresize form handler
window.onresize = function (event) {
  document.activeElement.scrollIntoView()
}
