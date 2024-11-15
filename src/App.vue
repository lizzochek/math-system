<template>
  <div>
    <router-view v-slot="{ Component }">
      <MainHeader />
      <ErrorModal v-if="isError" />
      <transition name="fade">
        <component :is="Component" />
      </transition>
      <MainFooter />
    </router-view>
  </div>
</template>

<script>
  import MainHeader from "./components/common/MainHeader.vue";
  import MainFooter from "./components/common/MainFooter.vue";
  import ErrorModal from "./components/common/ErrorModal.vue";
  export default {
    components: { MainHeader, MainFooter, ErrorModal },
    name: "App",
    async beforeCreate() {
      await this.$store.commit("initialiseStore");
    },
    computed: {
      isError() {
        return this.$store.state.errorMessage;
      },
    },
  };
</script>

<style lang="scss">
  html,
  body {
    height: 100%;
    margin: 0;
    background-color: rgb(17, 24, 39);
    font-family: Optima, sans-serif;
    font-size: 18px;
  }
</style>
