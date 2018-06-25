<template>
  <div>
    <h1 class="title is-5 has-text-centered has-text-weight-light">
      Account (Draft)
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
          <progress class="has-text-centerd exp progress title is-primary" value="50" text="325/5000" max="100" />
        </p>
      </div>
    </div>
    
    <div class="section">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
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
  height:46px
}

.media-content > p
{
  margin-bottom: 5px !important;
}

.exp {
  position: relative;
  text-align: center;
  text-shadow: 1px 1px gray;
  /* font-weight: lighter; */
  color: white;
  font-size: 0.8rem;
}

.exp:after {
  content: attr(text);
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
}
</style>
