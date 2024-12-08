<template>
  <div class="task-generator">
    <!-- Container for tfjs-vis -->
    <!-- <div id="tfjs-vis-container"></div> -->
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
    <div
      v-if="!isLoading && !answersSubmitted"
      class="flex flex-col items-center"
    >
      <h1 class="text-2xl text-white text-center mb-4">
        Here are the tasks for the {{ selectedTopic }} topic
      </h1>

      <div
        class="flex flex-col gap-2 rounded-lg bg-gray-800 h-full text-white p-[2rem] w-[90%] m-auto md:w-[60%] lg:w-[70%] mb-5"
        v-for="(task, idx) in generatedTasks"
        :key="idx"
      >
        <div class="flex flex-row gap-1">
          <p>Task {{ idx + 1 }}</p>
          <div class="relative group">
            <img
              style="padding-bottom: 3px"
              src="../assets/tooltip.png"
              width="25"
              height="25"
            />
            <div
              class="absolute bottom-full left-1/6 transform -translate-x-1/6 mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100"
            >
              Write your answers with no spaces.
              <br />
              If you get infinity write it as Infinity, if the task does not have a solution, write
              is as NaN.
              <br />
              Round your unswers to up to 2 digits after comma.
            </div>
          </div>
        </div>
        <p>
          {{ task.task }}
        </p>
        <label for="your-answer">Your answer:</label>
        <input
          class="border rounded-lg bg-gray-600 py-1 px-2"
          id="your-answer"
          v-model="yourAnswers[idx]"
          type="your-answer"
          placeholder="Enter your answer"
          required
        />
      </div>
      <button
        class="w-[20%] m-auto py-1 px-2 bg-purple-600 rounded-lg hover:bg-purple-700"
        required
        @click="submitAnswers"
      >
        Submit your answers
      </button>
    </div>
    <div
      v-if="!isLoading && answersSubmitted"
      class="flex flex-col items-center"
    >
      <h1 class="text-xl text-white text-center mb-4">Your test result:</h1>
      <p class="text-white text-center mb-4">
        If you believe the suggested answer is incorrect, please contact your teacher or support.
      </p>
      <div
        class="flex flex-col gap-2 rounded-lg bg-gray-800 h-full text-white p-[2rem] w-[90%] m-auto md:w-[60%] lg:w-[70%] mb-5"
        v-for="(task, idx) in generatedTasks"
        :key="idx"
      >
        <p>Task {{ idx + 1 }} {{ correctAnswers[idx] ? "✅" : "❌" }}</p>
        <p>
          {{ task.task }}
        </p>
        <p>Correct answer: {{ generatedTasks[idx].answer }}</p>
        <p>Your answer: {{ yourAnswers[idx] }}</p>
      </div>
      <button
        class="w-[20%] m-auto py-1 px-2 bg-purple-600 rounded-lg hover:bg-purple-700"
        required
        @click="$router.push('/ai-tasks')"
      >
        Try again
      </button>
    </div>
  </div>
</template>

<script>
  import * as tf from "@tensorflow/tfjs";
  import taskJSON from "../data/taskSet.json";
  import getRandomTasks from "../helpers/taskGenerator";
  // import * as tfvis from "@tensorflow/tfjs-vis";

  export default {
    data() {
      return {
        selectedTopic: "",
        model: null,
        predictedLevel: "",
        levels: ["Beginner", "Intermediate", "Advanced"],
        generatedTasks: null,
        task: "",
        isLoading: false,
        yourAnswers: [],
        answersSubmitted: false,
        correctAnswers: [],
      };
    },
    async mounted() {
      try {
        this.selectedTopic = this.$route.query.selectedTopic;

        await tf.setBackend("webgl");
        await tf.ready();
        console.log(`Backend: ${tf.getBackend()}`);

        this.isLoading = true;
        await this.initializeModel();
        await this.generateTasks();
        this.isLoading = false;
      } catch (error) {
        console.error("Error initializing TensorFlow.js:", error);
      }
    },
    methods: {
      generateTasksForLevelAndTopic(level, topic) {
        const topicTasks = taskJSON[topic.toLowerCase()].level[level.toLowerCase()];

        return getRandomTasks(topicTasks, level, 10);
      },
      async initializeModel() {
        const model = tf.sequential();

        model.add(
          tf.layers.dense({
            inputShape: [3], // Three features: score, attempts, correct answers
            units: 16,
            activation: "relu",
          })
        );

        model.add(
          tf.layers.dense({
            units: 8,
            activation: "relu",
          })
        );

        model.add(
          tf.layers.dense({
            units: this.levels.length, // Three levels: Beginner, Intermediate, Advanced
            activation: "softmax",
          })
        );

        model.compile({
          optimizer: tf.train.adam(),
          loss: "categoricalCrossentropy",
          metrics: ["accuracy"],
        });

        const { inputData, outputData } = this.prepareTrainingData();
        // Show the model summary
        // tfvis.show.modelSummary({ name: "Model Summary", tab: "Model" }, model);

        // Track the training process with tfjs-vis
        // const container = { name: "Training Performance", tab: "Training" };
        // const metrics = ["loss", "acc", "val_loss", "val_acc"]; // Monitor loss and accuracy

        await model.fit(inputData, outputData, {
          epochs: 20,
          batchSize: 8,
          validationSplit: 0.2,
          // callbacks: tfvis.show.fitCallbacks(container, metrics, {
          //   height: 200,
          //   callbacks: ["onEpochEnd"],
          // }),
        });

        this.model = model;

        inputData.dispose();
        outputData.dispose();

        this.isLoading = false;
      },
      prepareTrainingData() {
        const trainingData = [];

        // Generate random data for 300 samples
        for (let i = 0; i < 200; i++) {
          const score = Math.floor(Math.random() * 101); // Random score between 0 and 100
          const attempts = Math.floor(Math.random() * 10) + 1; // Random attempts between 1 and 10
          const correct = Math.floor(Math.random() * attempts); // Random correct answers <= attempts

          // Determine the level based on the score
          let level;
          if (score < 50) {
            level = [1, 0, 0]; // Beginner
          } else if (score < 80) {
            level = [0, 1, 0]; // Intermediate
          } else {
            level = [0, 0, 1]; // Advanced
          }

          trainingData.push({ input: [score, attempts, correct], level });
        }

        // Normalize the data
        const inputData = tf.tensor2d(
          trainingData.map((d) => [d.input[0] / 100, d.input[1] / 10, d.input[2] / 10]) // Normalize score, attempts, and correct answers
        );

        const outputData = tf.tensor2d(trainingData.map((d) => d.level)); // One-hot encoded levels

        return { inputData, outputData };
      },
      async generateTasks() {
        const studentData = JSON.parse(
          JSON.stringify(this.$store.getters["auth/getUser"].userAiTasks)
        )[this.selectedTopic];

        const inputTensor = tf.tensor2d([
          [studentData.score / 100, studentData.attempts / 10, studentData.correct / 10],
        ]);

        const outputTensor = this.model.predict(inputTensor);
        const predictedIndex = outputTensor.argMax(1).dataSync()[0];
        this.predictedLevel = this.levels[predictedIndex];

        this.generatedTasks = this.generateTasksForLevelAndTopic(
          this.predictedLevel,
          this.selectedTopic
        );

        inputTensor.dispose();
        outputTensor.dispose();
      },
      submitAnswers() {
        this.answersSubmitted = true;
        this.isLoading = true;

        const rightAnswers = this.generatedTasks.map((el) => el.answer.toString());
        const userAnswers = JSON.parse(JSON.stringify(this.yourAnswers));
        this.correctAnswers = userAnswers.map((el, idx) => rightAnswers[idx] === el);
        const numberOfCorrect = this.correctAnswers.filter(Boolean).length;
        this.$store.dispatch("auth/setAiTasks", {
          topic: this.selectedTopic,
          numCorrect: numberOfCorrect,
          level: this.predictedLevel,
        });

        this.isLoading = false;
      },
    },
  };
</script>
