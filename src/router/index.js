import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Main'
import Welp from '@/components/Welp/Welp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/welp',
      name: 'Welp',
      component: Welp
    }
  ]
})
