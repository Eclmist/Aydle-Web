<template>
  <div id="app">
    <background></background>
    <div class="header-style">
      <header-bar></header-bar>
    </div>
    <div class="router-style">
      <transition name="fade" enter-active-class="fadeIn" leave-active-class="">
        <router-view></router-view>
      </transition>
    </div>
    <div class="footer-style">
      <footer-bar></footer-bar>
    </div>
  </div>
</template>

<script>
import Header from './components/Header/HeaderBar'
import Background from './components/Background/ParallaxBackground.vue'
import Ascii from './components/Misc/Ascii'
import Footer from './components/FooterBar'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    'header-bar': Header,
    'background': Background,
    'ascii': Ascii,
    'footer-bar': Footer
  }
}
</script>

<style>
html, body
{
  height: 100%;
  margin: 0;
  overflow-y: hidden !important;
}

#app
{
  height: 100%;
}

.router-style
{
  /* 52px for header, 46px for footer 5px dev bar*/
  height: calc(100% - 103px);
}

.material-design-icon
{
  display: inline-flex !important;
}

@media screen and (max-height: 480px) {
  .footer-style
  {
    opacity: 0;
  }

  /* .header-style
  {
    opacity: 0;
  } */

  #app
  {
    overflow-y: hidden !important;
  }
}
</style>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: hsl(171, 100%, 41%);
$primary-invert: findColorInvert($primary);


// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert)
);

// Links
$link: hsl(217, 71%, 53%);
$link-invert: findColorInvert($link);
$link-focus-border: $primary;

.input.is-medium, .taginput .is-medium.taginput-container.is-focusable,
.textarea.is-medium {
  font-size: 1rem !important;
  height: 46px !important;
  padding-left: 2.5rem !important;
}

.button.is-medium {
  font-size: 1rem !important;
  height: 46px !important;
}

.button.is-primary.is-outlined.is-loading:hover {
  background-color: transparent;
}

.button.is-primary.is-outlined.is-loading:after {
  border-color: transparent transparent #fff #fff !important;
}

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>