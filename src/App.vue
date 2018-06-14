<template>
  <div id="app">
    <background></background>
    <header-bar></header-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header/HeaderBar'
import Background from './components/Background/ParallaxBackground.vue'
import Ascii from './components/Misc/Ascii'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    'header-bar': Header,
    'background': Background,
    'ascii': Ascii
  }
}
</script>

<style>
html, body
{
  height: 100%;
  margin: 0;
  overflow-y: auto !important;
}

#app
{
  height: 100%;
}

.material-design-icon
{
  display: inline-flex !important;
}
</style>