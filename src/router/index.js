import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Lobby from '@/components/Lobby/Lobby'
import Host from '@/components/Lobby/HostLobby'

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
      path: '/lobby/:id',
      name: 'Lobby',
      component: Lobby
    },
    {
      path: '/host',
      name: 'Host',
      component: Host
    },
    {
      // defualt route (fallback)
      path: '*',
      redirect: '/'
    }
  ]
})
