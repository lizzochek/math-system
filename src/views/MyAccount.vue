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

          <TaskCalendar />

          <button
            class="px-3 mt-10 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
            @click="logOut"
          >
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
            <p class="mt-4 text-2xl font-semibold text-yellow-400">
              {{ findAverageProgress() }}/100
            </p>
            <p class="text-sm text-gray-400">Average Score</p>
          </div>
          <div class="bg-gray-800 p-4 rounded-lg">
            <h3 class="text-lg font-medium">Courses Completed</h3>
            <p class="mt-4 text-2xl font-semibold">{{ completedCourses() }}</p>
          </div>
          <div class="bg-gray-800 p-4 rounded-lg">
            <h3 class="text-lg font-medium">Assignments Completed</h3>
            <p class="mt-4 text-2xl font-semibold">{{ completedAssignments() }}</p>
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
              <p class="text-sm text-gray-400">{{ findAuthorName(course.id) }}</p>
              <p class="text-sm text-gray-400">Progress: {{ findCourseProgress(course) }}%</p>
              <button
                class="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                @click="$router.push(`/my-course/${course.id}`)"
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
  import TaskCalendar from "@/components/common/TaskCalendar.vue";
  export default {
    components: { TaskCalendar },
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
        userCourses: [],
        selectedDate: new Date().toDateString(),
      };
    },
    created() {
      this.$store.dispatch("courses/fetchCourses");
      this.$store.dispatch("courses/fetchAuthors");
      this.userCourses = JSON.parse(
        JSON.stringify(this.$store.getters["auth/getUser"].userCourses)
      );
    },
    computed: {
      user() {
        return this.$store.state.auth.user;
      },
      courses() {
        const allCourses = this.$store.getters["courses/getCourses"];
        const resCourses = [];
        allCourses.forEach((course) => {
          this.userCourses.forEach((userCourse) => {
            if (course.id == userCourse.courseId) {
              resCourses.push(course);
            }
          });
        });
        return resCourses;
      },
    },
    methods: {
      logOut() {
        this.$store.dispatch("auth/logout");
        this.$router.push("/");
      },
      findAuthorName(id) {
        return this.$store.getters["courses/getAuthorById"](id).name;
      },
      findCourseProgress(course) {
        const userCourse = this.userCourses.find((userCourse) => userCourse.courseId == course.id);
        const { completedArticles, completedVideos, completedTasks } = userCourse;
        const completed = completedArticles.length + completedTasks.length + completedVideos.length;
        const total =
          course.content?.articles?.length +
          course.content?.videos?.length +
          course.content?.tasks?.length;
        return parseFloat((completed / total) * 100).toFixed(2);
      },
      findAverageProgress() {
        const progressResults = [];
        this.courses.forEach((course) => {
          progressResults.push(this.findCourseProgress(course));
        });
        return progressResults.reduce((sum, cur) => sum + Number(cur), 0) / progressResults.length;
      },
      completedCourses() {
        const res = [];
        this.courses.forEach((course) => {
          if (this.findCourseProgress(course) === 100) {
            res.push(course);
          }
        });
        return res.length;
      },
      completedAssignments() {
        let res = 0;
        this.userCourses.forEach((course) => {
          const { completedArticles, completedVideos, completedTasks } = course;
          const completed =
            completedArticles.length + completedTasks.length + completedVideos.length;
          res += completed;
        });
        return res;
      },
    },
  };
</script>

<style scoped></style>
