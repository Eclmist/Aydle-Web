<template>
  <div class="content has-text-centered has-text-grey">
  </div>
</template>

<script>
export default {
  mounted: function () {
    var self = this

    if (this.$cookie.get('dev-warn') === null) {
      this.$dialog.alert({
        title: 'You\'re here too early!',
        message: 'Aydle is currently under development. Many core funtionalities of the app may or may not function as intended. For a full experience, please check back again at a later date.',
        confirmText: 'I understand',
        hasIcon: true,
        type: 'is-info',
        onConfirm: function () {
          self.$cookie.set('dev-warn', true, { expires: '1D' })
        }
      })
    }
  }
}
</script>

<style scoped>
.content
{
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    70deg,
    hsl(48, 100%, 67%),
    hsl(48, 100%, 67%) 50px,
    hsl(48, 90%, 50%) 50px,
    hsl(48, 90%, 50%) 100px
  );
  /* background-size: 200%; */

  height: 5px;

  /* animation: scroll 5s linear infinite; */

  color: rgba(1, 1, 1, 0.4) !important;
  font-size: 0.8rem;
}

.content > span
{
  position: relative;
}

.notification > .media > .media-content
{
  text-align: center !important;
}

</style>
