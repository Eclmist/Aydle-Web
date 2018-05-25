<template>
  <div id="main" class="container has-text-centered">
    <div class="wrapper">
      <transition appear name="slide-fade">
        <div>
          <img src="/static/img/aydle-logo.png" alt="">
        </div>
      </transition>
      <lobby-select></lobby-select>
    </div>
    <!-- <nav class="navbar is-fixed-bottom"> -->
    <footer>
      <footer-bar></footer-bar>
    </footer>
    <!-- </nav> -->
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

#main
{
  min-height: 100%;
  flex-direction: column;
  display: flex;
  padding: 20px;
}

#main > div
{
  flex: 1 0 auto;
}

#main > footer
{
  flex-shrink: 0;
}

.wrapper
{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.wrapper > div{
  flex:1;
  align-items: flex-end;
  justify-content: center;
  display: flex;
}

.wrapper > .section
{
  flex: 1;
}
</style>
