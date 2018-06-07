<template>
  <div id="background-root">
    <canvas id="background">
      <div id="fallback"></div>
    </canvas>
    <img class="bgelement" src="/static/img/background/sky.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/clouds_1.png" alt="hidden-image"> -->
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

      // this.scallingCanvas.width = canvas.width
      this.scallingCanvas.height = canvas.height
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
          self.scallingCanvas.width = this.width * (self.canvasHeight / this.height)

          self.scallingCanvas.getContext('2d').drawImage(
            this,
            0,
            0,
            self.scallingCanvas.width,
            self.canvasHeight
          )

          spriteRef.pattern = self.context.createPattern(self.scallingCanvas, 'repeat-x')
        }
      }
    },
    drawSprite (sprite) {
      // this.context.drawImage(i, x, 0, this.canvasWidth, this.canvasHeight, 0, 0, this.canvasWidth, this.canvasHeight)
      // let ptn = this.context.createPattern(sprite.image, 'repeat-x')
      this.context.fillStyle = sprite.pattern
      // ptn

      let xPos = sprite.posX
      this.context.save()
      this.context.translate(xPos, sprite.posY)
      this.context.fillRect(-xPos, -sprite.posY, this.canvasWidth, this.canvasHeight)
      this.context.restore()
    },
    update () {
      for (var i = 0; i < this.sprites.length; i++) {
        let sprite = this.sprites[i]
        sprite.posX += i * -0.5
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
  /* height: 100vh; */
}

#background-root
{
  height: 0;
}
</style>


