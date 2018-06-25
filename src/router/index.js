import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Lobby from '@/components/Lobby/Lobby'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Main
    },
    {
      path: '/:id',
      redirect: '/'
    },
    {
      path: '/lobby/:id',
      name: 'Lobby',
      component: Lobby
    }
  ]
})
