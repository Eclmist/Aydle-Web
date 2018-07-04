import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'

// lobby
import Lobby from '@/components/Lobby/Lobby'
import LobbyMain from '@/components/Lobby/LobbyMain'
import Host from '@/components/Lobby/HostLobby'
import NamePicker from '@/components/Lobby/NamePicker'

// Games
import PassTheBomb from '@/components/Games/PassTheBomb'

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
      component: Lobby,
      children: [
        {
          path: '',
          name: 'NamePicker',
          component: NamePicker
        },
        {
          path: 'host',
          name: 'Host',
          component: Host
        },
        {
          path: 'main',
          name: 'LobbyMain',
          component: LobbyMain
        },
        {
          path: 'PassTheBomb',
          name: 'PassTheBomb',
          component: PassTheBomb
        }
      ]
    },
    {
      // defualt route (fallback)
      path: '*',
      redirect: '/'
    }
  ]
})
