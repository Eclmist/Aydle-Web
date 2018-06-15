<template>
  <div>
    <or></or>
    <div class="social">
      <a href="" class="button media-btn btn-google is-medium is-outlined">
        <img width="18" src="/static/img/icons/identity/google/google-32.png" class="icon" alt="google icon">
        <span>Google</span>
      </a>

      <a href="" class="button media-btn btn-facebook is-medium is-info">
        <b-icon class="icon" icon="facebook-box" style="margin:0"/>
        <span>
          Facebook
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import Or from './Or'
export default {
  components: {
    'or': Or
  }
}
</script>


<style scoped>
@font-face {
  font-family: Roboto;
  src: url(/static/fonts/Roboto-Medium.ttf);
}

.social
{
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.social > a
{
  flex: 1;
}

.icon
{
  margin-right: 0.5rem !important;
}

.btn-google
{
  font-family: Roboto !important;
  color: rgba(0, 0, 0, .54);
  margin-right: 1rem;
}

.btn-facebook
{
  background-color: #4267b2 !important;
  color: white;
}

.media-btn
{
  padding: 8px !important;
  font-size: 14px !important;
  height: 46px;
}
</style>
