<template>
  <!-- Header -->
    <nav class="level is-mobile" :style="{ top: navbarPos + 'px' }">
      <div class="level-left">
        <div class="level-item has-text-centered">
          <a href="" class="has-text-grey-lighter">
            <i class="fas fa-ellipsis-v" />
          </a>
        </div>
      </div>

      <div class="level-item has-text-centered logo">
        <img src="/static/img/icons/logo.png" style="height: 30px;" alt="">
      </div>
    
      <div class="level-right">
        <div class="level-item has-text-centered">
          <a href="" class="has-text-grey-lighter">
            <i class="fas fa-search" />
          </a>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  data () {
    return {
      previousFrameWindowYOffset: 0,
      scrollDelta: 0,
      unhideAtPos: 0,
      navbarPos: 0,
      hidden: false
    }
  },
  created () {
    window.addEventListener('scroll', this.scrollEvent)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollEvent)
  },
  methods: {
    scrollEvent () {
      this.scrollDelta = window.pageYOffset - this.previousFrameWindowYOffset

      // if (this.hidden) {
      //   // if scrolling up, and not shown at all
      //   if (this.scrollDelta < 0) {
      //     this.hidden = false
      //     this.navbarPos = -50
      //     this.unhideAtPos = this.scrollTop
      //   }
      // } else {
      //   if (this.scrollDelta > 0) {
      //     this.navbarPos = -window.pageYOffset
      //     if (window.pageYOffset > 50) {
      //       this.hidden = true
      //       this.unhideAtPos = this.scrollTop
      //     }
      //   } else {
      //     this.navbarPos = Math.min(0, -50 + (this.unhideAtPos - this.scrollTop))
      //   }
      // }

      // if (this.hidden) {
      //   // if hidden adn scrolling up
      //   if (this.scrollDelta < 0) {
      //     this.hidden = false
      //     this.unhideAtPos = window.pageYOffset - 50
      //   }
      // } else {
      //   // if not hidden, and if scrolling downwards
      //   if (this.scrollDelta > 0) {
      //     // if scrolled past 50 from the point of unhide
      //     if (window.pageYOffset - this.unhideAtPos > 50) {
      //       this.hidden = true
      //     }
      //   }
      // }

      // starting from the top
      // if its not hidden
      // if (!this.hidden) {
      //   // unhidepos is 0
      //   this.navbarPos = this.unhideAtPos - window.pageYOffset
      // } else {
      //   // scrolling up
      //   this.navbarPos = Math.min(0, -(window.pageYOffset - this.unhideAtPo))
      // }

      // scrolling downwards
      // if (this.scrollDelta > 0) {
      //   this.navbarPos = Math.max(-50, this.navbarPos - this.scrollDelta)
      // }

      // // scrolling upwards
      // if (this.scrollDelta < 0) {
      //   this.navbarPos = Math.min(0, this.navbarPos - this.scrollDelta)
      // }

      this.navbarPos = Math.min(0, Math.max(-51, (this.navbarPos - this.scrollDelta)))

      // dont touch
      this.previousFrameWindowYOffset = window.pageYOffset
    }
  }
}
</script>

<style scoped>
nav
{
  position: fixed;
  left: 0;
  right: 0;
  margin-bottom: 0 !important;
  padding: 0.65rem;
  background-color: #363636;
  z-index: 999;
}

.sticky-nav
{
  position: relative;
}

.logo
{
  margin-left: auto;
  margin-right: auto;
  width: 50px;
}

.level-item
{
  margin: 0 0.5rem !important;
  min-width: 0.5rem;
}
</style>
