<template>
  <div :class="selectedMode">
    <router-view v-slot="{ Component }">
      <MainHeader />
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
  import MainHeader from "./components/MainHeader.vue";
  export default {
    components: { MainHeader },
    name: "App",
    async beforeCreate() {
      await this.$store.commit("initialiseStore");
    },
  };
</script>

<style lang="scss">
  html,
  body {
    margin: 0;
  }
</style>
