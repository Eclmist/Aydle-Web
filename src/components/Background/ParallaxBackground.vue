<template>
  <div>
    <canvas id="background">
      <div id="fallback"></div>
    </canvas>
    <img class="bgelement" src="/static/img/background/sky.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/clouds_1.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/rocks.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/clouds_2.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/ground_1.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/ground_2.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/ground_3.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/plant.png" alt="hidden-image">
  </div>
</template>

<script>

export default {
  data () {
    return {
      sprites: [],
      context: {},
      canvasWidth: 0,
      canvasHeight: 0
    }
  },
  mounted () {
    // maximize the canvas
    window.addEventListener('resize', this.maximizeCanvas)
    this.maximizeCanvas()

    this.initialize()

    // update loop
    let self = this
    setInterval(function () {
      self.update()
    }, 16)
  },
  methods: {
    maximizeCanvas () {
      let canvas = document.getElementById('background')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      this.canvasWidth = canvas.width
      this.canvasHeight = canvas.height
    },
    initialize () {
      let canvas = document.getElementById('background')
      this.context = canvas.getContext('2d')

      let images = document.getElementsByClassName('bgelement')
      for (var i = 0; i < images.length; i++) {
        let spriteRef = {
          pattern: {},
          posX: 0,
          posY: 0
        }

        this.sprites.push(spriteRef)
        let self = this
        images[i].onload = function () {
          spriteRef.pattern = self.context.createPattern(this, 'repeat-x')
        }
      }
    },
    drawSprite (sprite) {
      // this.context.drawImage(i, x, 0, this.canvasWidth, this.canvasHeight, 0, 0, this.canvasWidth, this.canvasHeight)
      // let ptn = this.context.createPattern(sprite.image, 'repeat-x')
      this.context.fillStyle = sprite.pattern
      // ptn

      this.context.save()
      this.context.translate(sprite.posX, sprite.posY)
      this.context.fillRect(-sprite.posX, -sprite.posY, this.canvasWidth, this.canvasHeight)
      this.context.restore()
    },
    update () {
      for (var i = 0; i < this.sprites.length; i++) {
        let sprite = this.sprites[i]
        sprite.posX += i * 0.15
        this.drawSprite(sprite)
      }
    }
  }
}
</script>

<style scoped>
#background
{
  position: fixed;
  top: 0;
  z-index: -100;
}

#fallback
{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: url('/static/img/background/fallback.png');
  background-position: center;
}

.bgelement
{
  display: none;
}
</style>


