<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <header class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-purple-400">Help & FAQ</h1>
      <p class="text-gray-300 mt-2">
        Answers for Teachers and Students to get started with our Math System.
      </p>
    </header>

    <section class="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div>
        <h2 class="text-2xl font-semibold text-purple-300 mb-4">For Teachers</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-medium text-purple-400 mb-2">Creating Tasks</h3>
            <ul class="space-y-4">
              <li
                v-for="(faq, index) in teacherTasksFaqs"
                :key="'teacher-tasks-' + index"
                class="bg-gray-700 p-4 rounded-lg"
              >
                <h4
                  class="text-lg font-medium cursor-pointer"
                  @click="toggleAnswer('teacherTasksFaqs', index)"
                >
                  {{ faq.question }}
                  <span
                    class="ml-2 text-gray-400"
                    v-if="faq.expanded"
                    >[-]</span
                  >
                  <span
                    class="ml-2 text-gray-400"
                    v-else
                    >[+]</span
                  >
                </h4>
                <p
                  v-if="faq.expanded"
                  class="text-gray-300 mt-2"
                >
                  {{ faq.answer }}
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-xl font-medium text-purple-400 mb-2">Managing Graphs</h3>
            <ul class="space-y-4">
              <li
                v-for="(faq, index) in teacherGraphsFaqs"
                :key="'teacher-graphs-' + index"
                class="bg-gray-700 p-4 rounded-lg"
              >
                <h4
                  class="text-lg font-medium cursor-pointer"
                  @click="toggleAnswer('teacherGraphsFaqs', index)"
                >
                  {{ faq.question }}
                  <span
                    class="ml-2 text-gray-400"
                    v-if="faq.expanded"
                    >[-]</span
                  >
                  <span
                    class="ml-2 text-gray-400"
                    v-else
                    >[+]</span
                  >
                </h4>
                <p
                  v-if="faq.expanded"
                  class="text-gray-300 mt-2"
                >
                  {{ faq.answer }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-10">
        <h2 class="text-2xl font-semibold text-purple-300 mb-4">For Students</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-medium text-purple-400 mb-2">Solving Tasks</h3>
            <ul class="space-y-4">
              <li
                v-for="(faq, index) in studentTasksFaqs"
                :key="'student-tasks-' + index"
                class="bg-gray-700 p-4 rounded-lg"
              >
                <h4
                  class="text-lg font-medium cursor-pointer"
                  @click="toggleAnswer('studentTasksFaqs', index)"
                >
                  {{ faq.question }}
                  <span
                    class="ml-2 text-gray-400"
                    v-if="faq.expanded"
                    >[-]</span
                  >
                  <span
                    class="ml-2 text-gray-400"
                    v-else
                    >[+]</span
                  >
                </h4>
                <p
                  v-if="faq.expanded"
                  class="text-gray-300 mt-2"
                >
                  {{ faq.answer }}
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-medium text-purple-400 mb-2">Using Graphs</h3>
            <ul class="space-y-4">
              <li
                v-for="(faq, index) in studentGraphsFaqs"
                :key="'student-graphs-' + index"
                class="bg-gray-700 p-4 rounded-lg"
              >
                <h4
                  class="text-lg font-medium cursor-pointer"
                  @click="toggleAnswer('studentGraphsFaqs', index)"
                >
                  {{ faq.question }}
                  <span
                    class="ml-2 text-gray-400"
                    v-if="faq.expanded"
                    >[-]</span
                  >
                  <span
                    class="ml-2 text-gray-400"
                    v-else
                    >[+]</span
                  >
                </h4>
                <p
                  v-if="faq.expanded"
                  class="text-gray-300 mt-2"
                >
                  {{ faq.answer }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-purple-300 mb-4">Need More Help?</h2>
      <p class="text-gray-300">
        If you can’t find the answer you’re looking for, feel free to reach out to us directly.
      </p>
      <a
        href="mailto:support@example.com"
        class="mt-4 inline-block bg-purple-500 hover:bg-purple-400 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow transition"
      >
        Contact Support
      </a>
    </section>
  </div>
</template>

<script>
  export default {
    name: "HelpFaqPage",
    data() {
      return {
        teacherTasksFaqs: [
          {
            question: "How can I create a math task?",
            answer:
              "To create a task, log in to your teacher account and use the 'Create Task' feature. Add instructions, graphs, and equations for students.",
            expanded: false,
          },
          {
            question: "Can I include multiple graphs in one task?",
            answer:
              "Yes, you can include multiple graphs by separating them with spaces, e.g., [3d][x^2+y^2-z^2=0] [graph][y=2x].",
            expanded: false,
          },
        ],
        teacherGraphsFaqs: [
          {
            question: "How do I preview a graph before assigning it?",
            answer:
              "When creating a task, the system will render the graph for you in real-time based on the equation you input.",
            expanded: false,
          },
          {
            question: "What happens if a graph doesn’t render?",
            answer:
              "Ensure your equation is correctly formatted. For 2D, use [graph][equation]; for 3D, use [3d][equation].",
            expanded: false,
          },
        ],
        studentTasksFaqs: [
          {
            question: "How do I solve a task?",
            answer:
              "Read the instructions provided by your teacher. Use the graphs and equations to answer the question.",
            expanded: false,
          },
          {
            question: "Can I save my answers?",
            answer:
              "Your answers are saved automatically as you progress. Make sure to submit them when done.",
            expanded: false,
          },
        ],
        studentGraphsFaqs: [
          {
            question: "Can I interact with the graphs?",
            answer:
              "Yes, you can zoom in, rotate 3D graphs, and explore data points for better understanding.",
            expanded: false,
          },
          {
            question: "Why isn’t my graph loading?",
            answer:
              "Check your internet connection and refresh the page. If the problem persists, contact support.",
            expanded: false,
          },
        ],
      };
    },
    methods: {
      toggleAnswer(faqCategory, index) {
        this[faqCategory][index].expanded = !this[faqCategory][index].expanded;
      },
    },
  };
</script>
