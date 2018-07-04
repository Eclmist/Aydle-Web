<template>
  <div class="content">
    <h1 class="title has-text-white">Pass za bomba</h1>
    <div class="section">
      <img :src="bombUrl" alt="">
    </div>
    <div class="columns is-mobile">
      <div class="column">
        <button @click="generate" class="button is-fullwidth is-success">Generate</button>
      </div>
      <div class="column">
        <button @click="pass" class="button is-fullwidth is-danger">Pass</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gameObject: {}
  },
  data () {
    return {
      bombUrl: ''
    }
  },
  mounted () {
    this.bombUrl = 'http://localhost:2000' + this.gameObject.assets.images.bomb.url
  },
  methods: {
    generate () {

    },
    pass () {

    }
  }
}
</script>

<style scoped>
.section {
  width: 100%;
  max-height: 50vh;
}

.button
{
  width: 120px;
  height: 80px;
}

img
{
  max-width: 300px;
  height: 35vh;
}
</style>
