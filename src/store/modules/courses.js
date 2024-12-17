import { collection, getDocs, doc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";

export default {
  namespaced: true,
  state: {
    courses: [],
    author: null,
    authors: [],
    courseTasks: null,
    courseMaterials: null,
    articles: [],
    task: null,
  },
  getters: {
    getCourses(state) {
      return state.courses;
    },
    getAuthorById(state) {
      return (id) => state.authors.find((author) => author.id === id);
    },
    getAuthors(state) {
      return state.authors;
    },
    getCourseTasks(state) {
      return state.courseTasks;
    },
    getCourse: (state) => (id) => {
      return state.courses.find((course) => course.id === id);
    },
    getUserCourses: (state) => (id) => {
      return state.courses.find((course) => course.id === id);
    },
    getCourseMaterials: (state) => {
      return state.courseMaterials;
    },
    getArticleById: (state) => (id) => {
      return state.articles.find((article) => article.id === id);
    },
    getTask: (state) => {
      return state.task;
    },
  },
  mutations: {
    async fetchCourses(state, data) {
      const courses = [];
      const querySnapshot = await getDocs(collection(data.rootState.db, "courses"));
      querySnapshot.forEach((doc) => {
        courses.push({ id: doc.id, ...doc.data() });
      });
      state.courses = courses;
    },
    async fetchAuthor(state, { payload, rootState }) {
      const querySnapshot = await getDoc(doc(rootState.db, "authors", payload.id));
      state.author = { id: querySnapshot.id, ...querySnapshot.data() };
    },
    async fetchAuthors(state, { rootState }) {
      const authors = [];
      const querySnapshot = await getDocs(collection(rootState.db, "authors"));
      querySnapshot.forEach((doc) => {
        authors.push({ id: doc.id, ...doc.data() });
      });
      state.authors = authors;
    },
    async enrollToCourse(_, { rootState, payload }) {
      const newData = {
        completedArticles: [],
        completedTasks: [],
        completedVideos: [],
        courseId: payload.id,
      };
      await updateDoc(doc(rootState.db, "users", rootState.auth.user.uid.trim()), {
        userCourses: arrayUnion(newData),
      });
      rootState.auth.user.userCourses.push(newData);
    },
    async getCourseTasks(state, { rootState, payload }) {
      state.courseTasks = [];
      const course = state.courses.find((course) => course.id === payload.id);
      JSON.parse(JSON.stringify(course.content.tasks)).forEach(async (task) => {
        let querySnapshot = await getDoc(doc(rootState.db, "tasks", task.toString()));
        state.courseTasks.push({
          id: querySnapshot.id,
          ...querySnapshot.data(),
          dueDate: querySnapshot.data().dueDate.toDate().toString().split("00:00:00")[0],
        });
      });
    },
    async getCourseMaterials(state, { rootState, payload }) {
      state.courseMaterials = { articles: [], videos: [] };
      await payload.course.content.articles.forEach(async (article) => {
        let querySnapshot = await getDoc(doc(rootState.db, "articles", article.toString()));
        state.courseMaterials.articles.push({
          id: querySnapshot.id,
          ...querySnapshot.data(),
        });
      });
      await payload.course.content.videos.forEach(async (video) => {
        let querySnapshot = await getDoc(doc(rootState.db, "videos", video.toString()));
        state.courseMaterials.videos.push({
          id: querySnapshot.id,
          ...querySnapshot.data(),
        });
      });
    },
    async markArticleCompleted(state, { rootState, payload }) {
      const userCourses = rootState.auth.user.userCourses;
      const userCourse = userCourses.find((course) => course.courseId === payload.courseId);
      const newData = {
        ...userCourses,
        [userCourses.indexOf(userCourse)]: {
          ...userCourse,
          completedArticles: [...userCourse.completedArticles, payload.id],
        },
      };

      await updateDoc(doc(rootState.db, "users", rootState.auth.user.uid.trim()), {
        userCourses: newData,
      });
      rootState.auth.user.userCourses = newData;
    },
    async fetchArticles(state, { rootState }) {
      state.articles = [];
      const querySnapshot = await getDocs(collection(rootState.db, "articles"));
      querySnapshot.forEach((doc) => {
        state.articles.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    },
    async fetchTask(state, { rootState, payload }) {
      state.task = [];
      let querySnapshot = await getDocs(collection(rootState.db, "tasks"));
      querySnapshot.forEach((doc) => {
        if (doc.id == payload.id) {
          state.task = {
            id: doc.id,
            ...doc.data(),
          };
        }
      });
    },
  },
  actions: {
    async fetchCourses({ commit, rootState }) {
      commit("fetchCourses", { rootState });
    },
    async fetchAuthor({ commit, rootState }, payload) {
      commit("fetchAuthor", { rootState, payload });
    },
    async fetchAuthors({ commit, rootState }) {
      commit("fetchAuthors", { rootState });
    },
    async enrollToCourse({ commit, rootState }, payload) {
      commit("enrollToCourse", { rootState, payload });
    },
    async getCourseTasks({ commit, rootState }, payload) {
      commit("getCourseTasks", { rootState, payload });
    },
    async getCourseMaterials({ commit, rootState }, payload) {
      commit("getCourseMaterials", { rootState, payload });
    },
    async markArticleCompleted({ commit, rootState }, payload) {
      commit("markArticleCompleted", { rootState, payload });
    },
    async fetchArticles({ commit, rootState }) {
      commit("fetchArticles", { rootState });
    },
    async fetchTask({ commit, rootState }, payload) {
      commit("fetchTask", { rootState, payload });
    },
  },
};
