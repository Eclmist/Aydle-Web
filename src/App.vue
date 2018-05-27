<template>
  <div id="app">
    <div class="main-background"></div>
    <header-bar></header-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/HeaderBar'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    'header-bar': Header
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

html
{
  /* background: linear-gradient(141deg, #30b9c9 0%, #2c7ee8 100%); */
  /* background-image: url('/static/img/background/welpbg.jpeg') !important */
  
  /* background: linear-gradient(205deg, #4f65f8, #c583e7, #c4e783);
  background-size: 300% 300%; */
  background: linear-gradient(0deg, #e78383, #6ecacd, #8390e7, #c183e7, #e78383);
  background-size: 500% 500%;
  -webkit-animation: background 150s ease infinite;
  animation: background 150s ease infinite;

  /* mix-blend-mode:hard-light; */
}

@-webkit-keyframes background {
  0%{background-position:0% 0%}
  /* 50%{background-position:0% 100%} */
  100%{background-position:0% 500%}
}

@keyframes background { 
  0%{background-position:0% 0%}
  /* 50%{background-position:0% 100%} */
  100%{background-position:0% 500%}
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

</style>