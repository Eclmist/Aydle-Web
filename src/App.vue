<template>
  <div id="app">
    <div class="main-background"></div>
    <header-bar></header-bar>
    <dev-warning></dev-warning>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header/HeaderBar'
import DevWarning from './components/DevelopmentWarning'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    'header-bar': Header,
    'dev-warning': DevWarning
  }
}
</script>

<style>

/* @import './vue2-animate/dist/vue2-animate.min.css'; */

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

.background
{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -100;
  background: linear-gradient(205deg, #4f65f8, #c583e7);
  background-size: 100% 100%;
}

.main-background
{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-image: url('/static/img/background/silhouette.jpg');
  /* mix-blend-mode: difference; */
  opacity: 0.5;
  background-size: cover;
}

.material-design-icon
{
  display: inline-flex !important;
}
</style>