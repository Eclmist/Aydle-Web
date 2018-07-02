<template>
  <footer class="container has-text-light has-text-centered">
    <p class="has-text-weight-light is-7">
      Copyright &copy; Aydlesoft 2018 <br>
      All rights reserved
      <!-- Under Development -->
    </p>
    <dev-warning></dev-warning>
  </footer>
</template>

<script>
import DevWarning from './DevelopmentWarning'

export default {
  components: {
    'dev-warning': DevWarning
  }
}
</script>


<style scoped>
.container
{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

p
{
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.2rem;
}

footer
{
  width: 100% !important;
}
</style>
