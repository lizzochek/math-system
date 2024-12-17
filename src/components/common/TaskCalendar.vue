<template>
  <div class="flex flex-col justify-center">
    <h3 class="m-auto mt-10">Your tasks calendar</h3>
    <VDatePicker
      class="mt-2 m-auto"
      v-model="selectedDate"
      color="indigo"
      is-dark="true"
    />
    <div
      v-for="(task, idx) in dueTasks"
      :key="idx"
    >
      <div
        v-if="task.dueDate.toDateString() == selectedDate.toDateString()"
        class="mt-2 w-[95%] m-auto p-2 border rounded-lg border-white"
      >
        <p>{{ task.title }}</p>
        <p class="text-sm text-gray-400">{{ task.description }}</p>
        <button
          class="text-xs text-purple-400 cursor-pointer"
          @click="$router.push(`/course-task/${task.id}?courseId=${findTaskCourse(task.id)}`)"
        >
          Start task✍🏻
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectedDate: new Date(),
      };
    },
    created() {
      this.$store.dispatch("auth/fetchUser");
      this.$store.dispatch("courses/fetchCourses");

      const userCourses = this.$store.getters["auth/getUser"].userCourses;
      const courseIds = userCourses.map((el) => el.courseId);
      const completedTasks = [];
      userCourses.forEach((el) => {
        el.completedTasks.forEach((element) => {
          completedTasks.push(element.id);
        });
      });

      const courseTasks = this.$store.getters["courses/getCourses"]
        .filter((course) => courseIds.includes(Number(course.id)))
        .map((el) => el.content.tasks)
        .flat();

      const unfinishedTasks = courseTasks.filter((el) => !completedTasks.includes(el));

      this.$store.dispatch("courses/fetchTasksById", { ids: unfinishedTasks });
    },
    computed: {
      dueTasks() {
        return this.$store.getters["courses/getTasks"].map((el) => ({
          ...el,
          dueDate: el.dueDate.toDate(),
        }));
      },
    },
    methods: {
      findTaskCourse(taskId) {
        const courses = this.$store.getters["courses/getCourses"];
        const res = courses.find((course) => course?.content?.tasks.includes(Number(taskId)));
        return res.id;
      },
    },
  };
</script>
