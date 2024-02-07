<template>
  <LoginModal
    v-if="option === 'login'"
    @setOption="setOption"
  />
</template>

<script>
  import LoginModal from "../components/authentication/LoginModal.vue";
  export default {
    name: "AuthPage",
    components: { LoginModal },
    data() {
      return {
        option: "login",
      };
    },
    methods: {
      setOption(option) {
        console.log(option);
        this.option = option;
      },
    },
  };
</script>
