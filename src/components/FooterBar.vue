<template>
  <footer class="container has-text-light has-text-centered">
    <p class="has-text-weight-light is-7">
      Copyright &copy; Aydlesoft 2018 <br>
      All Rights Reserved <br>
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
p
{
  /* margin-bottom: 20px; */
  margin-left: auto;
  margin-right: auto;
}

footer
{
  width: 100% !important;
}
</style>
