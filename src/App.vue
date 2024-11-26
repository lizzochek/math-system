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
    data() {
      return {
        startTime: null,
      };
    },
    components: { MainHeader, MainFooter, ErrorModal },
    name: "App",
    async beforeCreate() {
      await this.$store.commit("initialiseStore");
    },
    mounted() {
      this.startTime = Date.now();

      this.$store.dispatch("auth/addTime", 1000);
      window.addEventListener("beforeunload", this.stopTracking);
    },
    unmounted() {
      this.stopTracking();
      window.removeEventListener("beforeunload", this.stopTracking);
    },
    computed: {
      isError() {
        return this.$store.state.errorMessage;
      },
    },
    methods: {
      stopTracking() {
        const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
        this.$store.dispatch("auth/addTime", timeSpent);
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
