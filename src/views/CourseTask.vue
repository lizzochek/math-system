<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <button
      class="text-lg font-semibold text-purple-500 hover:underline"
      @click="$router.push(`/my-course/${$route.query.courseId}`)"
    >
      &larr; Back to course
    </button>
    <div
      v-if="isLoading"
      class="flex flex-col h-72 justify-center items-center"
    >
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <p class="text-white mt-5 text-center">
        {{
          answersSubmitted
            ? "Please wait, we are evaluating your answers 🙃"
            : "Please wait, we are generating your tasks 🙃"
        }}
      </p>
    </div>
    <div v-else>
      <header class="mb-6 text-center">
        <h1 class="text-4xl font-bold text-purple-400">Get started with your tasks🥇</h1>
      </header>
      <div
        v-for="(el, idx) in parsedTasks"
        :key="idx"
        class="bg-gray-800 p-6 rounded-lg shadow-lg mb-2"
      >
        <h2
          v-if="!answersSubmitted"
          class="text-2xl font-semibold text-purple-300"
        >
          Task {{ idx + 1 }}:
        </h2>
        <h2
          v-else
          class="text-2xl font-semibold text-purple-300"
        >
          Task:
        </h2>
        <p class="text-gray-200 mt-4">{{ el.info }} ({{ el.points }} points)</p>
        <div
          v-if="el.graphURL.length"
          class="mt-8"
        >
          <iframe
            :src="el.graphURL"
            width="100%"
            height="500px"
            class="bg-gray-700 rounded-lg"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <label
          v-if="!answersSubmitted"
          for="your-answer"
          class="pr-4"
          >Your answer:</label
        >
        <input
          v-if="!answersSubmitted"
          class="mt-4 border rounded-lg bg-gray-600 py-1 px-2"
          id="your-answer"
          v-model="yourAnswers[idx]"
          type="your-answer"
          placeholder="Enter your answer"
          required
        />
        <div
          v-else
          class="mt-4"
        >
          {{ yourAnswers[idx] ? `Your answer: ${yourAnswers[idx]}` : "" }}
          <br />
          Correct answer: {{ el.answer }}
        </div>
      </div>
      <button
        v-if="!answersSubmitted"
        class="w-[20%] m-auto mt-3 py-1 px-2 bg-purple-600 rounded-lg hover:bg-purple-700"
        required
        @click="submitAnswers"
      >
        Submit your answers
      </button>
      <div v-else>You got {{ numberOfPoints }} points for this task!</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CourseTask",
    data() {
      return {
        parsedTasks: [],
        yourAnswers: [],
        answersSubmitted: false,
        isLoading: false,
        numberOfPoints: 0,
      };
    },
    methods: {
      parseTask(task) {
        const graphRegex = /\[graph\]\[([^\]]+)\]/;
        const threeDRegex = /\[3d\]\[([^\]]+)\]/g;

        let graphMatch = task.match(graphRegex);
        let threeDMatch = task.match(threeDRegex);
        threeDMatch = threeDMatch
          ?.map((match) => match.match(/\[([^\]]+)\]\[([^\]]+)\]/)[2])
          .join(";");

        graphMatch = graphMatch
          ?.map((match) => match.match(/\[([^\]]+)\]\[([^\]]+)\]/)[2])
          .join(";");

        let graphURL = "";

        if (graphMatch) {
          graphURL = `https://www.geogebra.org/classic?command=${encodeURIComponent(graphMatch)}`;
        } else if (threeDMatch) {
          graphURL = `https://www.geogebra.org/3d?command=${encodeURIComponent(threeDMatch)}`;
        }

        return graphURL;
      },
      submitAnswers() {
        if (confirm("Are you sure you want to submit your answers?")) {
          this.answersSubmitted = true;
          this.isLoading = true;
          this.numberOfPoints = 0;

          const userAnswers = JSON.parse(JSON.stringify(this.yourAnswers));
          this.parsedTasks.forEach((task, idx) => {
            if (task.answer == userAnswers[idx]) {
              this.numberOfPoints += task.points;
            }
          });
          this.$store.dispatch("auth/markTaskCompleted", {
            id: this.task.id,
            score: this.numberOfPoints,
            courseId: this.$route.query.courseId,
          });

          this.isLoading = false;
        }
      },
    },
    computed: {
      task() {
        return this.$store.getters["courses/getTask"];
      },
    },
    created() {
      this.$store.dispatch("auth/fetchUser");
      const userData = this.$store.getters["auth/getUser"];
      const courseData = userData.userCourses.find(
        (course) => course.courseId == this.$route.query.courseId
      );
      const foundTask = courseData.completedTasks.find((task) => task.id == this.$route.params.id);
      if (foundTask) {
        this.answersSubmitted = true;
        this.numberOfPoints = foundTask.score;
      }
      this.$store.dispatch("courses/fetchTask", { id: this.$route.params.id });
    },
    watch: {
      task() {
        if (this.task?.data?.length > 0) {
          this.task.data.forEach((el) => {
            const graphURL = this.parseTask(el.info);
            const parsedInfo = el.info
              .replace(/\[3d\]\[([^\]]+)\]|\[graph\]\[([^\]]+)\]/g, "")
              .trim();
            this.parsedTasks.push({ ...el, graphURL, info: parsedInfo });
          });
        }
      },
    },
  };
</script>

<style scoped>
  iframe {
    margin: auto;
    width: 90%;
    height: 500px;
  }
</style>
