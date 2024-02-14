<template>
  <div
    class="flex align-middle bg-opacity-75 fixed left-0 top-0 z-[1055] bg-neutral-700 w-full h-full overflow-y-auto overflow-x-hidden outline-none"
  >
    <div
      class="w-[80%] md:w-[50%] m-auto flex flex-col items-center justify-between rounded-lg bg-white p-4"
    >
      <h1 class="text-2xl">Sorry, an error occurred!</h1>
      <p class="py-5">{{ errorMessage }}</p>
      <button
        class="py-1 w-full bg-purple-600 rounded-lg hover:bg-purple-700 text-white"
        @click="resolveError"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ErrorModal",
    computed: {
      errorMessage() {
        return this.$store.state.errorMessage;
      },
    },
    methods: {
      resolveError() {
        this.$store.dispatch("setPropByName", {
          property: "errorMessage",
          value: "",
        });
        window.location.reload();
      },
    },
  };
</script>
