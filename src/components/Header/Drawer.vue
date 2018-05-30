<template>
  <md-drawer class="md-right md-fixed md-persistent" :md-active.sync="isOpen">
    <md-toolbar class="md-transparent" md-elevation="0">
      <span class="md-title">Aydle</span>
    </md-toolbar>
    <md-list>
      <md-list-item>
        <b-icon icon="duck"/>
        <span class="md-list-item-text">Host a Lobby</span>
      </md-list-item>
    </md-list>
  </md-drawer>
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
.md-right
{
  z-index: 100;
  background-color: white;
}
</style>
