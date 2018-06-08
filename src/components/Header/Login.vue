<template>
  <div class="modal-card"> 
    <!-- <header class="modal-card-head">
    </header> -->
    <section class="modal-card-body">
      <div class="level">
        <a class="button is-fullwidth">
          <span class="icon">
            <i class="fab fa-google"></i>
          </span>
          <span>Google</span>
        </a>
      </div>
      <div class="level">
        <a class="button is-info is-fullwidth">
          <span class="icon">
            <i class="fab fa-facebook"></i>
          </span>
          <span>Facebook</span>
        </a>
      </div>
      <p class="has-text-centered is-7 title has-text-grey">- OR -</p>

      <form @submit.prevent>
        <b-field label="Email">
            <b-input
                type="email"
                :value="email"
                placeholder="you@example.org"
                required>
            </b-input>
        </b-field>

        <b-field label="Password">
            <b-input
                type="password"
                :value="password"
                placeholder="********"
                required>
            </b-input>
        </b-field>
        <a href="#" class="forget-pw is-pulled-right has-text-right is-size-7">forgot?</a>
        <br>

        <div class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <a href="#" class="is-size-7">
                more login options
              </a>
            </div>
          </div>
          <div class="level-right">
            <button class="button is-primary">Login</button>
          </div>
        </div>
      </form>
    </section>
    <!-- <footer class="modal-card-foot">
    </footer> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>


<style scoped>
.modal-card-body
{
  padding: 30px;
}

.modal-card
{
  max-width: 360px;

  margin-left: auto !important;
  margin-right: auto !important;

}
.modal-content 
{
  /* min-height: 365.5px !important; */
  overflow: visible !important;
}

.forget-pw
{
  position: relative;
  top: -8px;
}


</style>

