import { createStore } from "vuex";
import auth from "./modules/auth";
import courses from "./modules/courses";

export default createStore({
  state: {
    errorMessage: "",
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
  },
  actions: {
    setPropByName({ commit, rootState }, payload) {
      commit("setPropByName", { rootState, payload });
    },
  },
  modules: { auth, courses },
});
