import "../styles/style.css";
import mount from "./mount";
import { createApp } from "vue";
import ProfileApp from "../vue/ProfileApp.vue";
import store from "./store";

document.body.appendChild(mount());

createApp(ProfileApp).use(store).mount(".app-root");
