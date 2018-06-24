<template>
  <div>
    <h1 class="title is-5 has-text-centered has-text-weight-light">
      Account
    </h1>
    <div class="media">
      <div class="media-left">
        <figure id="avatar" class="image is-32x32" 
          v-if="$store.getters.isSignedIn &&
          $store.getters.photoURL !== null">
          <img v-bind:src="$store.getters.photoURL" alt="avatar">
        </figure>
      </div>
      <div class="media-content">
        <p>
          {{ $store.getters.username }}
        </p>
        <p>
          Level: 1
        </p>
      </div>
      <div classspan="media-right">
        <a @click.prevent>(edit)</a>
      </div>
    </div>
    
    <div class="section">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, aliquam.
    </div>

    <div class="tags">
      <span v-for="(data, index) in $store.getters.groups" 
      :key="index" class="tag" :class="data[1]">{{ data[0] }}
      </span>
    </div>

    <social divider-text="Linked Accounts" />
    <button @click="logout()" class="button is-fullwidth is-danger">
      Log out
    </button>
  </div>
</template>

<script>
import or from './Or'
import Social from './Social'
export default {
  methods: {
    logout () {
      this.$emit('logout')
    }
  },
  components: {
    'or': or,
    'social': Social
  }
}
</script>

<style scoped>
.media-left > figure
{
  width: 50px !important;
  height: 50px !important;
}

.section 
{
  padding-left: 1rem;
  padding-right: 1rem;
}

.button
{
  height:46px;
}
</style>
