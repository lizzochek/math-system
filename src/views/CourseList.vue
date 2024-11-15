<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
    <h1 class="mb-8 ml-8 text-4xl font-bold">Courses</h1>
    <section
      v-for="course in courses"
      :key="course.id"
      class="grid grid-cols-12 gap-6 bg-gray-800 p-8 rounded-lg shadow-lg mb-8"
    >
      <!-- Left Column -->
      <div class="col-span-6">
        <h2 class="text-3xl font-bold text-green-400">{{ course.data.title }}</h2>
        <p class="text-sm font-medium text-yellow-400">Advanced Level | Premium Plan</p>
        <p class="mt-4 text-gray-300">
          {{ course.data.description }}
        </p>
        <div class="flex items-center space-x-2 mt-4 text-yellow-400">
          <span class="text-lg font-bold">{{ course.data.rating }}</span>
          <span class="text-sm">({{ course.data.numberOfRatings }} Ratings)</span>
          <span class="text-sm text-gray-300">| {{ course.data.numberOfStudents }} Students</span>
        </div>
        <p class="text-sm text-gray-300">Language: {{ course.data.language }}</p>
        <p class="mt-2 text-sm text-gray-300">Author: {{ course.data.author }}</p>

        <div class="flex space-x-4 mt-6">
          <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
            See details
          </button>
        </div>
      </div>

      <!-- Right Column -->
      <div class="ml-5 col-span-6">
        <h3 class="text-lg font-semibold">What you will learn:</h3>
        <ul class="mt-4 space-y-2 text-gray-300">
          <li
            v-for="(item, idx) in course.data.whatYouLearn"
            :key="idx"
          >
            &bull; {{ item }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
  import { collection, getDocs } from "firebase/firestore";
  export default {
    data() {
      return {
        courses: [],
      };
    },
    async created() {
      const querySnapshot = await getDocs(collection(this.$store.state.db, "courses"));
      querySnapshot.forEach((doc) => {
        this.courses.push({ id: doc.id, data: doc.data() });
      });
    },
  };
</script>
