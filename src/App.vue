<template>
  <div :class="selectedMode">
    <router-view v-slot="{ Component }">
      <MainHeader />
      <transition name="fade">
        <component :is="Component" />
      </transition>
      <MainFooter />
    </router-view>
  </div>
</template>

<script>
  import MainHeader from "./components/MainHeader.vue";
  import MainFooter from "./components/MainFooter.vue";
  export default {
    components: { MainHeader, MainFooter },
    name: "App",
    async beforeCreate() {
      await this.$store.commit("initialiseStore");
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
