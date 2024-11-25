<template>
  <div class="col-span-6">
    <h2 class="text-3xl font-bold text-green-400">{{ course.title }}</h2>
    <p class="text-sm font-medium text-yellow-400">Advanced Level | Premium Plan</p>
    <p class="mt-4 text-gray-300">
      {{ course.description }}
    </p>
    <div class="flex items-center space-x-2 mt-4 text-yellow-400">
      <span class="text-lg font-bold">{{ course.rating }}</span>
      <span class="text-sm">({{ course.numberOfRatings }} Ratings)</span>
      <span class="text-sm text-gray-300">| {{ course.numberOfStudents }} Students</span>
    </div>
    <p class="text-sm text-gray-300">Language: {{ course.language }}</p>
    <p class="mt-2 text-sm text-gray-300">Author: {{ authorName }}</p>

    <div class="flex space-x-4 mt-6">
      <button
        class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        @click="handleClick"
      >
        {{ isInList ? "See details" : "Enroll" }}
      </button>
    </div>
  </div>

  <!-- Right Column -->
  <div class="ml-5 col-span-6">
    <h3 class="text-lg font-semibold">What you will learn:</h3>
    <ul class="mt-4 space-y-2 text-gray-300">
      <li
        v-for="(item, idx) in course.whatYouLearn"
        :key="idx"
      >
        &bull; {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "MainCourseDetail",
    props: ["course"],
    computed: {
      isInList() {
        return this.$router.currentRoute.value.path === "/courses";
      },
      authorName() {
        this.$store.dispatch("courses/fetchAuthors");
        return this.$store.getters["courses/getAuthorById"](this.course.author).name;
      },
    },
    methods: {
      handleClick() {
        if (this.isInList) {
          this.$router.push(`/courses/${this.course.id}`);
        } else {
          // FINISH THIS PART
        }
      },
    },
  };
</script>
