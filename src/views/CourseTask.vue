<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <!-- Header -->
    <header class="mb-6 text-center">
      <h1 class="text-4xl font-bold text-teal-400">Interactive Math Task</h1>
      <p class="text-gray-300 mt-2">Solve the problem and explore the graph or 3D figure!</p>
    </header>

    <!-- Task Section -->
    <section class="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-teal-300">Task:</h2>
      <p class="text-gray-200 mt-4">{{ task }}</p>
    </section>

    <!-- Graph/3D Figure Section -->
    <div
      v-if="graphURL"
      class="mt-8"
    >
      <h3 class="text-xl font-medium text-teal-400 mb-4">Graph Visualization:</h3>
      <iframe
        :src="graphURL"
        width="100%"
        height="500px"
        class="bg-gray-700 rounded-lg"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>

    <div
      v-else
      class="text-gray-400 mt-8 text-center"
    >
      No graph or 3D figure detected in the task input.
    </div>
  </div>
</template>

<script>
  export default {
    name: "CourseTask",
    data() {
      return {
        tasks: "Visualize the graph  see the 3D surface: [3d][x^2+y^2-z^2=0] [3d][z=1]",
        graphURL: null,
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

        if (graphMatch) {
          this.graphURL = `https://www.geogebra.org/classic?command=${encodeURIComponent(
            graphMatch
          )}`;
        } else if (threeDMatch) {
          this.graphURL = `https://www.geogebra.org/3d?command=${encodeURIComponent(threeDMatch)}`;
        }
      },
    },
    // mounted() {
    //   this.parseTask();
    // },
  };
</script>

<style scoped>
  iframe {
    width: 100%;
    height: 500px;
  }
</style>
