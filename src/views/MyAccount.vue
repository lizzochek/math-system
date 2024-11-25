<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
    <div class="grid grid-cols-12 gap-6">
      <!-- Sidebar -->
      <aside
        class="col-span-2 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 flex justify-center"
      >
        <div class="flex flex-col items-center">
          <img
            src="../assets/person-icon.png"
            alt="Profile"
            class="rounded-full w-24 h-24 mb-4"
          />
          <h2 class="text-xl font-semibold text-center">{{ user.displayName }}</h2>
          <p class="text-sm text-center text-gray-400">{{ user.email }}</p>
          <p class="text-sm text-gray-400">Student | Advanced Math Class</p>

          <VDatePicker
            class="mt-10"
            v-model="selectedDate"
            :color="indigo"
            is-dark="true"
          />

          <button class="px-3 mt-10 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
            Log Out
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="col-span-10 space-y-6">
        <!-- Stats Section -->
        <div class="grid grid-cols-3 gap-6">
          <div class="bg-gray-800 p-4 rounded-lg">
            <h3 class="text-lg font-medium">General Stats</h3>
            <p class="mt-4 text-2xl font-semibold text-yellow-400">97.5/100</p>
            <p class="text-sm text-gray-400">Average Score</p>
          </div>
          <div class="bg-gray-800 p-4 rounded-lg">
            <h3 class="text-lg font-medium">Courses Completed</h3>
            <p class="mt-4 text-2xl font-semibold">11</p>
          </div>
          <div class="bg-gray-800 p-4 rounded-lg">
            <h3 class="text-lg font-medium">Assignments Completed</h3>
            <p class="mt-4 text-2xl font-semibold">147</p>
          </div>
        </div>

        <!-- Activity Hours -->
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="text-lg font-medium">Activity Hours</h3>
          <div class="mt-4 flex space-x-4">
            <div
              v-for="day in activity"
              :key="day.day"
              class="flex-1"
            >
              <p class="text-sm text-center text-gray-400">{{ day.day }}</p>
              <div
                class="h-24 bg-gradient-to-t from-pink-500 to-transparent rounded-lg mt-2"
                :style="{ height: day.hours * 10 + 'px' }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Courses Section -->
        <div>
          <h3 class="text-lg font-semibold">My Courses</h3>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div
              v-for="course in courses"
              :key="course.title"
              class="bg-gray-800 p-4 rounded-lg"
            >
              <h4 class="text-xl font-semibold">{{ course.title }}</h4>
              <p class="text-sm text-gray-400">{{ course.author }}</p>
              <p class="text-sm text-gray-400">Progress: {{ course.progress }}%</p>
              <button
                class="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
              >
                Open Course
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activity: [
          { day: "Sun", hours: 3 },
          { day: "Mon", hours: 5 },
          { day: "Tue", hours: 2 },
          { day: "Wed", hours: 4 },
          { day: "Thu", hours: 6 },
          { day: "Fri", hours: 1 },
          { day: "Sat", hours: 3 },
        ],
        courses: [
          { title: "Differential Equations", author: "Anthony Brown", progress: 100 },
          { title: "Number Theory", author: "Sofia Khomych", progress: 95 },
          { title: "Combinatorics", author: "John Hadd", progress: 45 },
          { title: "Probability", author: "Jacob Allen", progress: 88 },
        ],
        selectedDate: new Date().toDateString(),
      };
    },
    computed: {
      user() {
        return this.$store.state.auth.user;
      },
    },
  };
</script>

<style scoped></style>
