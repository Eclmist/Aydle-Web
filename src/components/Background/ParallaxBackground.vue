<template>
  <div id="background-root">
    <canvas id="background">
    </canvas>
    <div id="fallback" v-bind:class="{ day: isDay }"></div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      sprites: [],
      spriteSrc: [
        [
          '/static/img/background/night/1.png',
          '/static/img/background/night/2.png',
          '/static/img/background/night/3.png',
          '/static/img/background/night/4.png',
          '/static/img/background/night/5.png',
          '/static/img/background/night/6.png',
          '/static/img/background/night/7.png',
          '/static/img/background/night/8.png'
        ],
        [
          '/static/img/background/day/1.png',
          '/static/img/background/day/2.png',
          '/static/img/background/day/3.png',
          '/static/img/background/day/4.png',
          '/static/img/background/day/5.png',
          '/static/img/background/day/6.png',
          '/static/img/background/day/7.png'
        ]
      ],
      context: {},
      canvasWidth: 0,
      canvasHeight: 0,
      scallingCanvas: {},
      allSpritesLoaded: false,
      allowBackgroundAnimation: true,
      isDay: false
    }
  },
  created () {
    this.debouncedMaximizeCanvas = this._.debounce(this.maximizeCanvas, 50)

    const hours = new Date().getHours()
    this.isDay = hours > 6 && hours < 20
    let spriteSource = this.isDay ? this.spriteSrc[1] : this.spriteSrc[0]

    for (var i = 0; i < spriteSource.length; i++) {
      let newImg = new Image()
      newImg.src = spriteSource[i]

      let spriteRef = {
        pattern: {},
        img: newImg,
        posX: 0,
        posY: 0,
        imageLoaded: false
      }

      this.sprites.push(spriteRef)
      let self = this
      newImg.onload = function () {
        spriteRef.imageLoaded = true
        self.initSprite(spriteRef)
      }
    }
  },
  mounted () {
    this.initialize()
    // maximize the canvas
    window.addEventListener('resize', this.debouncedMaximizeCanvas)
    this.maximizeCanvas()

    // update loop
    window.requestAnimationFrame(this.update)
  },
  methods: {
    maximizeCanvas () {
      if (window.innerHeight < 550) {
        return
      }
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
      // this.context.filter = 'blur(3px)'
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

  background-position: center;
  background-size: cover;
}

.day
{
  background-image: url('/static/img/background/day/fallback.png') !important;
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


