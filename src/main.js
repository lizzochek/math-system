import { createApp } from "vue";
import initFirebase from "./firebase";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

store.subscribe((mutation, state) => {
  if (mutation.type != "initialiseStore") {
    setTimeout(() => localStorage.setItem("state", JSON.stringify(state)), 100);
  }
});

createApp(App).use(router).use(store).use(VCalendar, {}).mount("#app");
const db = initFirebase();

store.state.db = db;
