<template>
  <div id="background-root">
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
      canvasHeight: 0,
      scallingCanvas: {}
    }
  },
  mounted () {
    this.initialize()
    // maximize the canvas
    window.addEventListener('resize', this.maximizeCanvas)
    this.maximizeCanvas()

    // update loop
    window.requestAnimationFrame(this.update)
  },
  methods: {
    maximizeCanvas () {
      let canvas = document.getElementById('background')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      this.canvasWidth = canvas.width
      this.canvasHeight = canvas.height

      // this.scallingCanvas.width = canvas.width
      this.scallingCanvas.height = canvas.height
      this.initAllSprites()
    },
    initialize () {
      let canvas = document.getElementById('background')
      this.context = canvas.getContext('2d')
      this.scallingCanvas = document.createElement('canvas')

      let images = document.getElementsByClassName('bgelement')
      for (var i = 0; i < images.length; i++) {
        let spriteRef = {
          pattern: {},
          img: images[i],
          posX: 0,
          posY: 0
        }

        this.sprites.push(spriteRef)
        let self = this
        images[i].onload = function () {
          self.initSprite(spriteRef)
        }
      }
    },
    initAllSprites () {
      for (let i = 0; i < this.sprites.length; i++) {
        this.initSprite(this.sprites[i])
      }
    },
    initSprite (sprite) {
      this.scallingCanvas.width = sprite.img.width * (this.canvasHeight / sprite.img.height)

      this.scallingCanvas.getContext('2d').drawImage(
        sprite.img,
        0,
        0,
        this.scallingCanvas.width,
        this.canvasHeight
      )

      sprite.pattern = this.context.createPattern(this.scallingCanvas, 'repeat-x')
    },
    drawSprite (sprite) {
      // this.context.drawImage(i, x, 0, this.canvasWidth, this.canvasHeight, 0, 0, this.canvasWidth, this.canvasHeight)
      // let ptn = this.context.createPattern(sprite.image, 'repeat-x')
      this.context.fillStyle = sprite.pattern
      // ptn

      let xPos = sprite.posX + (sprite.img.width - this.canvasWidth)
      this.context.save()
      this.context.translate(xPos, sprite.posY)
      this.context.fillRect(-xPos, -sprite.posY, this.canvasWidth, this.canvasHeight)
      this.context.restore()
    },
    update () {
      for (var i = 0; i < this.sprites.length; i++) {
        let sprite = this.sprites[i]
        sprite.posX += i * -0.1
        this.drawSprite(sprite)
      }

      window.requestAnimationFrame(this.update)
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
  /* height: 100vh; */
}

#background-root
{
  height: 0;
}
</style>


