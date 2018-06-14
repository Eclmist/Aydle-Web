<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <login-modal v-if="modalState === 'Login'" />
      <signup-modal v-if="modalState === 'SignUp'" />
      <forgetpw-modal v-if="modalState === 'Forget'" />
    </section>
  </div>
</template>

<script>
import Login from './Login'
import SignUp from './SignUp'
import ForgetPw from './ForgetPassword'
export default {
  data () {
    return {
      modalState: 'SignUp'
    }
  },
  components: {
    'login-modal': Login,
    'signup-modal': SignUp,
    'forgetww-modal': ForgetPw
  }
}
</script>

<style>
.modal-card
{
  max-width: 360px;

  margin-left: auto !important;
  margin-right: auto !important;
}

.modal-card-body
{
  padding: 30px;
}
</style>
