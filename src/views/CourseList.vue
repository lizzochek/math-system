<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
    <h1 class="mb-8 ml-8 text-4xl font-bold">Courses {{ authorName ? `by ${authorName}` : "" }}</h1>
    <section
      v-for="course in courses"
      :key="course.id"
      class="grid grid-cols-12 gap-6 bg-gray-800 p-8 rounded-lg shadow-lg mb-8"
    >
      <MainCourseDetail :course="course" />
    </section>
  </div>
</template>

<script>
  import MainCourseDetail from "../components/common/MainCourseDetail.vue";
  export default {
    components: { MainCourseDetail },
    data() {
      return {
        authorName: null,
      };
    },
    async created() {
      this.$store.dispatch("courses/fetchCourses");
      if (this.$route.query.author) this.getAuthorName();
    },
    computed: {
      courses() {
        const courses = this.$store.getters["courses/getCourses"];
        if (this.$route.query.author) {
          return courses.filter((course) => course.author === this.$route.query.author);
        } else {
          return courses;
        }
      },
    },
    methods: {
      getAuthorName() {
        this.$store.dispatch("courses/fetchAuthors");
        return this.$store.getters["courses/getAuthorById"](this.$route.query.author).name;
      },
    },
  };
</script>
