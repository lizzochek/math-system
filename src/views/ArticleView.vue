<template>
  <div class="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white p-8">
    <!-- Back Button -->
    <h1
      class="mb-8 ml-8 text-2xl font-bold cursor-pointer"
      @click="$router.back()"
    >
      ← Back to Course Materials
    </h1>

    <!-- Article Details -->
    <div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold mb-4">{{ article?.title }}</h1>
      <div class="text-gray-400 text-sm mb-4">
        <span>By {{ article?.author }}</span>
        <span class="mx-2">|</span>
        <span
          >Published on {{ article?.dateCreated.toDate().toString().split("00:00:00")[0] }}</span
        >
      </div>
      <p class="text-gray-300 leading-relaxed">
        {{ article?.content }}
      </p>
    </div>
    <button
      v-if="!isCompleted"
      class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg mt-5"
      @click="markCompleted"
    >
      Mark as completed
    </button>
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch("courses/fetchArticles");
    },
    mounted() {},
    computed: {
      article() {
        return this.$store.getters["courses/getArticleById"](this.$route.params.id.toString());
      },
      isCompleted() {
        const userCourses = this.$store.getters["auth/getUser"].userCourses;
        const course = userCourses.find((course) => course.courseId === this.$route.query.courseId);
        if (course.completedArticles.includes(this.article?.id.toString())) return true;
        else return false;
      },
    },
    methods: {
      markCompleted() {
        this.$store.dispatch("courses/markArticleCompleted", {
          id: this.article.id,
          courseId: this.$route.query.courseId,
        });
        alert("Marked as completed");
      },
    },
  };
</script>
