<template>
  <div class="container has-text-centered">
    <transition appear name="slide-fade">
      <section>
        <img src="static/img/aydle-logo.png" alt="">
      </section>
    </transition>
    <lobby-select></lobby-select>
    <nav class="navbar is-fixed-bottom">
      <footer-bar></footer-bar>
    </nav>
  </div>
</template>

<script>
import Lobby from './Lobby/LobbySelect'
import Footer from './FooterBar'

export default {
  components: {
    'lobby-select': Lobby,
    'footer-bar': Footer
  }
}
</script>

<style scoped>
img
{
  width: 80%;
  max-width: 400px;
}
</style>
