import "../styles/style.css";
import mount from "./mount";
import { createApp } from "vue";
import App from "../vue/App.vue";
import store from "./store";

document.body.appendChild(mount());

createApp(App).use(store).mount(".app-root");
