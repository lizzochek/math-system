import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export default {
  namespaced: true,
  state: {
    courses: [],
    author: null,
    authors: [],
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
    getCourse: (state) => (id) => {
      return state.courses.find((course) => course.id === id);
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
  },
};
