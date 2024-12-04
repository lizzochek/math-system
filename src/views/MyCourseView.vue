<template>
  <div class="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white p-6 space-y-8">
    <!-- Course Header -->
    <header class="space-y-4">
      <h1 class="text-3xl font-bold">My Courses — {{ course.title }}</h1>
      <p class="text-gray-400">Explore your learning progress and manage tasks effectively.</p>
    </header>

    <!-- Course Details Section -->
    <section class="grid grid-cols-3 gap-6">
      <!-- Left Panel: Topic List -->
      <div class="bg-gradient-to-br from-purple-700 to-purple-900 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Course Outline</h2>
        <ul class="mt-4 space-y-2 text-gray-300">
          <li
            v-for="(item, idx) in course.whatYouLearn"
            :key="idx"
          >
            &bull; {{ item }}
          </li>
        </ul>
      </div>

      <!-- Center Panel: tasks -->
      <div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg col-span-2">
        <h2 class="text-xl font-semibold mb-4">Assignments</h2>
        <div
          v-for="(task, index) in tasks"
          :key="index"
          class="space-y-2 border-b border-gray-700 pb-4 mb-4"
        >
          <h3 class="font-semibold">{{ task.title }}</h3>
          <p class="text-gray-400">{{ task.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">Due Date: {{ task.dueDate }}</span>
            <a class="text-sm text-purple-400 hover:underline">Submit task</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Materials Section -->
    <section class="grid grid-cols-3 gap-6">
      <div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg col-span-3">
        <h2 class="text-xl font-semibold mb-4">Course Materials</h2>
        <div class="grid grid-cols-2 gap-6 mb-4">
          <div
            v-for="(article, index) in courseMaterials.articles"
            :key="index"
            class="p-4 bg-gray-700 rounded-lg"
          >
            <h3 class="font-semibold text-lg">{{ article.title }}</h3>
            <a
              @click="$router.push(`/article/${article.id}?courseId=${course.id}`)"
              class="text-purple-400 text-sm hover:underline mt-2 block"
            >
              View article &nbsp;&rsaquo;
            </a>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div
            v-for="(video, index) in courseMaterials.videos"
            :key="index"
            class="p-4 bg-gray-700 rounded-lg"
          >
            <h3 class="font-semibold text-lg">{{ video.title }}</h3>
            <a
              :href="video.link"
              class="text-purple-400 text-sm hover:underline mt-2 block"
            >
              View video &nbsp;&rsaquo;
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Achievements Section -->
    <section class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Achievements</h2>
      <div class="grid grid-cols-4 gap-6">
        <div
          v-for="(achievement, index) in achievements"
          :key="index"
          class="flex flex-col items-center"
        >
          <div
            class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-3xl"
          >
            🏆
          </div>
          <span class="text-gray-300 text-center mt-2">{{ achievement }}</span>
        </div>
      </div>
    </section>

    <!-- Progress Section -->
    <section class="grid grid-cols-3 gap-6">
      <!-- Progress Chart -->
      <div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-8">Progress Overview</h2>
        <div class="flex justify-center items-center">
          <div class="relative size-40">
            <svg
              class="size-full rotate-180"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- Background Circle (Gauge) -->
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                class="stroke-current text-gray-200 dark:text-neutral-700"
                stroke-width="1"
                stroke-dasharray="50 100"
                stroke-linecap="round"
              ></circle>

              <!-- Gauge Progress -->
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                class="stroke-current text-purple-600 dark:text-purple-500"
                stroke-width="1.5"
                :stroke-dasharray="`${findCourseProgress($route.params.id) / 2} 100`"
                stroke-linecap="round"
              ></circle>
            </svg>

            <!-- Value Text -->
            <div class="absolute top-9 start-1/2 transform -translate-x-1/2 text-center pl-1">
              <span class="text-2xl font-bold text-purple-600 dark:text-purple-500"
                >{{ findCourseProgress($route.params.id) }}%</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg col-span-2">
        <h2 class="text-xl font-semibold mb-4">Community Help</h2>
        <div
          v-for="(comment, index) in comments"
          :key="index"
          class="space-y-2 border-b border-gray-700 pb-4 mb-4"
        >
          <div class="flex justify-between items-center">
            <span class="font-semibold">{{ comment.author }}</span>
            <span class="text-sm text-gray-500">{{ comment.date }}</span>
          </div>
          <p class="text-gray-300">{{ comment.text }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        achievements: [
          "Completed 10 tasks",
          "Score Above 90% in Tests",
          "Participated in 5 Discussions",
          "Perfect Attendance",
        ],
        comments: [
          {
            author: "Student A",
            date: "2024-12-01",
            text: "I’m struggling with Laplace transforms. Does anyone have a good resource to recommend?",
          },
          {
            author: "Student B",
            date: "2024-12-02",
            text: "I found the lecture notes really helpful for solving the first-order equations. Happy to share!",
          },
        ],
      };
    },
    async created() {
      this.$store.dispatch("courses/fetchCourses");
      this.$store.dispatch("courses/getCourseTasks", { id: this.course.id });
      this.$store.dispatch("courses/getCourseMaterials", { course: this.course });
      this.$store.dispatch("courses/fetchAuthors");
    },
    computed: {
      course() {
        return this.$store.getters["courses/getCourse"](this.$route.params.id);
      },
      author() {
        return this.$store.getters["courses/getAuthorById"](this.course.author);
      },
      tasks() {
        return this.$store.getters["courses/getCourseTasks"];
      },
      courseMaterials() {
        return this.$store.getters["courses/getCourseMaterials"];
      },
    },
    methods: {
      findCourseProgress(course) {
        const userCourse = this.$store.getters["auth/getUser"].userCourses.find(
          (el) => (el.courseId = course)
        );
        const { completedArticles, completedVideos, completedTasks } = JSON.parse(
          JSON.stringify(userCourse)
        );
        const completed = completedArticles.length + completedTasks.length + completedVideos.length;

        const total =
          this.course.content?.articles?.length +
          this.course.content?.videos?.length +
          this.course.content?.tasks?.length;
        return parseFloat((completed / total) * 100).toFixed(2);
      },
    },
  };
</script>
