<template>
</template>

<script>
export default {
  props: {
    isOpen: Boolean
  },
  watch: {
    isOpen: function () {
      if (!this.isOpen) {
        this.$emit('drawerClosed')
      }
    }
  }
}
</script>

<style scoped>
</style>
