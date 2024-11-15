<template>
  <div class="auth-page">
    <LoginModal
      v-if="option === 'login'"
      @setOption="setOption"
    />
    <SignupModal
      v-else
      @setOption="setOption"
    />
  </div>
</template>

<script>
  import LoginModal from "../components/authentication/LoginModal.vue";
  import SignupModal from "../components/authentication/SignupModal.vue";

  export default {
    name: "AuthPage",
    components: { LoginModal, SignupModal },
    data() {
      return {
        option: "login",
      };
    },
    methods: {
      setOption(option) {
        this.option = option;
      },
    },
  };
</script>
