import { createStore } from "vuex";
import auth from "./modules/auth";
import courses from "./modules/courses";

export default createStore({
  state: {
    errorMessage: "",
    usageStatistics: [],
  },
  getters: {},
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("state")) {
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem("state"))));
      }
    },
    setPropByName(_, data) {
      const { rootState, payload } = data;
      if (payload.module) {
        rootState[payload.module][payload.property] = payload.value;
      } else {
        rootState[payload.property] = payload.value;
      }
    },
    formattedTime: (state) => {
      const hours = Math.floor(state.timeSpentToday / 3600);
      const minutes = Math.floor((state.timeSpentToday % 3600) / 60);
      const seconds = state.timeSpentToday % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    },
  },
  actions: {
    setPropByName({ commit, rootState }, payload) {
      commit("setPropByName", { rootState, payload });
    },
  },
  modules: { auth, courses },
});
