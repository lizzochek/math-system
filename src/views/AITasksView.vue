<template>
  <div
    class="rounded-lg bg-gray-800 h-full text-white p-[2rem] w-[90%] m-auto md:w-[60%] lg:w-[40%]"
  >
    <h1 class="text-3xl text-center mb-4">Welcome to MathMinds AI 🥳</h1>

    <h2 class="text-xl text-center mb-5">
      Select your topic and the AI will create tasks based on your skills!
    </h2>

    <form class="w-full flex flex-col items-center">
      <label
        for="topic"
        class="mb-3"
        >Select Topic:</label
      >
      <select
        v-model="selectedTopic"
        class="mb-4 text-black"
      >
        <option
          v-for="(topic, idx) of topics"
          :key="idx"
          :value="topic"
        >
          {{ topic }}
        </option>
      </select>

      <button
        class="py-1 px-2 bg-purple-600 rounded-lg hover:bg-purple-700"
        required
        @click="
          (e) => {
            e.preventDefault();
            $router.push({ path: '/generated-ai-tasks', query: { selectedTopic } });
          }
        "
      >
        Generate Task
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectedTopic: "",
        topics: ["Arithmetic", "Algebra", "Geometry", "Trigonometry", "Probability"],
      };
    },
  };
</script>
