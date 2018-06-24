<template>
  <div class="has-text-centered or">
    <hr />
    <div class="or-span">{{ text }}</div>
    <hr />
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style scoped>
.or
{
  margin: 10px 0 !important;
  display: flex;
}

.or > hr, div
{
  flex: 1;
  flex-basis: auto;

  /* margin-top: 0.5rem; */
  /* margin-bottom: 0.5rem; */
}

.or > .or-span
{
  flex: 1;
  flex-basis: auto;
  flex-grow: 0;
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 12px;
  padding-right: 12px;
  vertical-align: middle;
  font-size: 12px;
  color: #aaa;
  justify-content: center;
  align-items: center;
}


</style>
