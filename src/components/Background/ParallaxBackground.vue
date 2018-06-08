<template>
  <div id="background-root">
    <canvas id="background">
    </canvas>
    <div id="fallback"></div>
    <img class="bgelement" src="/static/img/background/night/1.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/night/2.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/night/3.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/night/4.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/night/5.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/night/6.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/night/7.png" alt="hidden-image">
    <img class="bgelement" src="/static/img/background/night/8.png" alt="hidden-image">
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
      scallingCanvas: {},
      allSpritesLoaded: false,
      allowBackgroundAnimation: true,
      isDay: false
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
          posY: 0,
          imageLoaded: false
        }

        this.sprites.push(spriteRef)
        let self = this
        images[i].onload = function () {
          spriteRef.imageLoaded = true
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
      if (!sprite.imageLoaded) {
        return
      }

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

      let xPos = sprite.posX - (this.scallingCanvas.width - this.canvasWidth) / 2
      this.context.save()
      this.context.translate(xPos, sprite.posY)
      this.context.fillRect(-xPos, -sprite.posY, this.canvasWidth, this.canvasHeight)
      this.context.restore()
    },
    update () {
      if (!this.allowBackgroundAnimation) {
        window.requestAnimationFrame(this.update)
        return
      }

      if (this.allSpritesLoaded) {
        for (let i = 0; i < this.sprites.length; i++) {
          let sprite = this.sprites[i]
          sprite.posX += i * -0.1
          this.drawSprite(sprite)
        }
      } else {
        let isAllLoaded = true
        for (let i = 0; i < this.sprites.length; i++) {
          if (!this.sprites[i].imageLoaded) {
            isAllLoaded = false
            break
          }
        }
        this.allSpritesLoaded = isAllLoaded
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
  z-index: -101;

  background: url('/static/img/background/fallback.png');
  background-position: center;
  background-size: cover;
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


