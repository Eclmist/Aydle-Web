<template>
  <section class="section">
    <footer class="navbar is-dark is-fixed-bottom">
      <div class="columns is-mobile">
        <div class="column"><i class="fas fa-home"></i></div>
        <div class="column"><i class="fas fa-comment-alt"></i></div>
        <div class="column">
          <div class="circle" />
          <i class="fas fa-upload" />
        </div>
        <div class="column"><i class="fas fa-bell"></i></div>
        <div class="column"><i class="fas fa-user"></i></div>
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style scoped>
footer
{
  min-height: 2.6em;
}

footer .columns
{
  margin-left: 0.2em;
  margin-right: 0.2em;
  margin-top: -0.2em;
}

footer .column
{
  text-align: center;
}

.circle
{
  background-color: #445;
  position: absolute;
  width: 50px;
  height: 50px;
  right: 0;
  left: 0;
  bottom: -0.3em;
  margin: auto;
  border-radius: 50%;
  z-index: -1;
}
</style>
