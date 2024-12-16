<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <header class="mb-6 text-center">
      <h1 class="text-4xl font-bold text-purple-400">Get started with your tasks🥇</h1>
    </header>
    <div
      v-for="(el, idx) in parsedTasks"
      :key="idx"
      class="bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <h2 class="text-2xl font-semibold text-purple-300">Task:</h2>
      <p class="text-gray-200 mt-4">{{ el.info }}</p>
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

        <label
          for="your-answer"
          class="pr-4"
          >Your answer:</label
        >
        <input
          class="mt-4 border rounded-lg bg-gray-600 py-1 px-2"
          id="your-answer"
          v-model="yourAnswers[idx]"
          type="your-answer"
          placeholder="Enter your answer"
          required
        />
      </div>
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
    },
    computed: {
      task() {
        return this.$store.getters["courses/getTask"];
      },
    },
    created() {
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
    height: 300px;
  }
</style>
