import { createStore } from "vuex";

export default createStore({
  state: {
    errors: {},
  },
  getters: {},
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("state")) {
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem("state"))));
      }
    },
  },
  actions: {},
});
