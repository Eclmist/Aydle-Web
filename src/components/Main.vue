<template>
  <div id="main" class="container has-text-centered">
    <div class="wrapper">
      <transition appear name="pulse">
        <div>
          <img src="/static/img/aydle-logo.png" alt="">
        </div>
      </transition>
      <lobby-select></lobby-select>
    </div>
  </div>
</template>

<script>
import Lobby from './Lobby/LobbySelect'

export default {
  components: {
    'lobby-select': Lobby
  }
}
</script>

<style scoped>
img
{ 
  width: 75vw;
  max-width: 400px;
  /* padding: 0 15%; */
}

#main
{
  min-height: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  padding: 20px;
}

#main > footer
{
  flex-shrink: 0;
}

.wrapper
{
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.wrapper > div
{
  /* padding-top: 3rem; */
  flex:1;
  align-items: flex-end;
  display: flex;
  flex-basis: auto;
}

.wrapper > .section
{
  flex: 1;
  flex-basis: auto;
}
</style>
