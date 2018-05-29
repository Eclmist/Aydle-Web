<template>
  <b-notification type="is-warning" closable>
    <div class="content has-text-centered has-text-grey">
      Site Under Construction
    </div>
  </b-notification>
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
.notification
{
  position: absolute;
  z-index: 10;
  width: 100%;
}

.notification > .media > .media-content
{
  text-align: center !important;
}
</style>
