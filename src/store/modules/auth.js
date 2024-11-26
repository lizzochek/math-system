// import { collection, where, query } from "firebase/firestore";

export default {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    logout(state) {
      state.user = {};
    },
    async addTime() {
      //   const d = new Date();
      //   let day = d.getDay();
      //   // FINISH HERE
      //   const q = query(
      //     collection(rootState.db, "Cases"),
      //     where("email", "==", "john_doe@gmail.com")
      //   );
      //   console.log(q, state, day);
    },
  },
  actions: {
    logout({ commit }) {
      commit("logout");
    },
    addTime({ commit, rootState }, payload) {
      commit("addTime", { rootState, payload });
    },
  },
};
