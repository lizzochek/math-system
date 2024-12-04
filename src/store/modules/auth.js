import { doc, updateDoc, getDoc } from "firebase/firestore";

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
    async setAiTasks(state, { rootState, payload }) {
      const userData = await getDoc(doc(rootState.db, "users", state.user.uid.trim()));

      const { topic, numCorrect, level } = payload;
      const levelMultiplicators = { Beginner: 1, Intermediate: 2, Advanced: 3 };
      const { score, attempts, correct } = userData.data().userAiTasks[topic];
      const newData = {
        score: score + numCorrect * levelMultiplicators[level],
        attempts: attempts + 1,
        correct: correct + numCorrect,
      };

      await updateDoc(doc(rootState.db, "users", state.user.uid.trim()), {
        userAiTasks: {
          ...userData.data().userAiTasks,
          [topic]: newData,
        },
      });

      state.user.userAiTasks[topic] = newData;
    },
  },
  actions: {
    logout({ commit }) {
      commit("logout");
    },
    addTime({ commit, rootState }, payload) {
      commit("addTime", { rootState, payload });
    },
    setAiTasks({ commit, rootState }, payload) {
      commit("setAiTasks", { rootState, payload });
    },
  },
};
