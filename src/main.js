import { createApp } from "vue";
import initFirebase from "./firebase";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";

createApp(App).use(router).use(store).mount("#app");
initFirebase();
