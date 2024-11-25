<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
    <h1 class="mb-8 ml-8 text-4xl font-bold">Authors</h1>
    <div
      v-for="author in authors"
      :key="author.id"
    >
      <AuthorCard
        class="w-full"
        :author="author"
      />
    </div>
  </div>
</template>

<script>
  import AuthorCard from "@/components/common/AuthorCard.vue";
  export default {
    components: { AuthorCard },
    async created() {
      this.$store.dispatch("courses/fetchAuthors");
    },
    computed: {
      authors() {
        return this.$store.getters["courses/getAuthors"];
      },
    },
  };
</script>
