<template>
  <div id="app">
    <!-- <transition name="fade">
      <loader v-if="!this.$root.$data.pageLoaded"/>
    </transition> -->
    <main>
      <div class="content hero is-fullheight is-dark">
        <header-bar></header-bar>
        <div class="hero-body">
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Loader from './components/Loader'
import Header from './components/HeaderBar'
// import Footer from './components/FooterBar'

export default {
  name: 'app',
  mounted () {
    // this.$root.$data.pageLoaded = true
    // setTimeout(() => {
    //   this.$root.$data.pageLoaded = true
    // }, 1000)
  },
  data () {
    return {
    }
  },
  components: {
    'loader': Loader,
    'header-bar': Header
    // 'footer-bar': Footer
  }
}
</script>

<style>
/* Transitions */
.slide-fade-enter-active
{
  transition: all 1s;
}

.slide-fade-enter
{
  opacity: 0;
  transform: translateY(30px);
}

.slide-fade-down-enter-active
{
  transition: all 1s;
}

.slide-fade-down-enter
{
  opacity: 0;
  transform: translateY(-30px);
}

/* End Transitions*/ 

.hero 
{
  /* background: linear-gradient(141deg, #30b9c9 0%, #2c7ee8 100%); */
  /* background-image: url('/static/img/background/welpbg.jpeg') !important */
  
  /* background: linear-gradient(205deg, #4f65f8, #c583e7, #c4e783);
  background-size: 300% 300%; */
  background: linear-gradient(205deg, #e78383, #dcc881, #a5c96f, #6ecacd, #8390e7, #c183e7, #e78389);
  background-size: 1000% 1000%;
  -webkit-animation: background 15s ease infinite;
  animation: background 15s ease infinite;
}

@-webkit-keyframes background {
  0%{background-position:0% 42%}
  50%{background-position:100% 59%}
  100%{background-position:0% 42%}
}

@keyframes background { 
  0%{background-position:0% 42%}
  50%{background-position:100% 59%}
  100%{background-position:0% 42%}
}
</style>