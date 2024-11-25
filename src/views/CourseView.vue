<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
    <!-- Header Section -->
    <header class="flex items-center space-x-4 mb-8">
      <button
        class="text-lg font-semibold text-purple-500 hover:underline"
        @click="$router.push('/courses')"
      >
        &larr; Courses
      </button>
      <h1 class="text-2xl font-bold">Differential Equations</h1>
    </header>

    <div class="grid grid-cols-12 gap-6 bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
      <MainCourseDetail :course="course" />
    </div>

    <!-- Content and Requirements Section -->
    <section class="grid grid-cols-2 gap-6">
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold">Contents:</h3>
        <ul class="mt-4 space-y-2 text-gray-300">
          <li>&bull; {{ course.content?.videos?.length || 0 }} Video lectures</li>
          <li>&bull; {{ course.content?.tasks?.length || 0 }} AI-generated tasks</li>
          <li>&bull; {{ course.content?.articles?.length || 0 }} Articles</li>
          <li>&bull; Demonstrations of real-world applications</li>
          <li>&bull; Certificate of completion</li>
        </ul>
        <div class="mt-4 space-x-2">
          <span
            v-for="hashtag in course?.hashtags"
            :key="hashtag"
            class="bg-purple-600 px-3 py-1 rounded-lg text-sm"
            >{{ hashtag }}</span
          >
        </div>
      </div>

      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold">Requirements:</h3>
        <ul
          v-for="(requirement, idx) in course?.requirements"
          :key="idx"
          class="mt-4 space-y-2 text-gray-300"
        >
          <li>&bull; {{ requirement }}</li>
        </ul>
      </div>
    </section>

    <AuthorCard :author="author" />
  </div>
</template>

<script>
  import MainCourseDetail from "../components/common/MainCourseDetail.vue";
  import AuthorCard from "@/components/common/AuthorCard.vue";
  export default {
    async created() {
      this.$store.dispatch("courses/fetchCourses");
    },
    computed: {
      course() {
        return this.$store.getters["courses/getCourse"](this.$route.params.id);
      },
      author() {
        this.$store.dispatch("courses/fetchAuthors");
        return this.$store.getters["courses/getAuthorById"](this.course.author);
      },
    },
    components: { MainCourseDetail, AuthorCard },
  };
</script>
