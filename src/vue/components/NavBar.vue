<template>
  <div class="navbar">
    <a :href="logo.link">
      <img class="logo" :src="getImgUrl(logo.path)" :alt="logo.name" />
    </a>
    <search />
    <icons />
    <div class="hamburger-menu">
      <img
        class="hamburger-menu-icon logo"
        :src="getImgUrl('hamburger-icon.png')"
        @click="toggleMenu"
      />
    </div>
  </div>
</template>

<script>
import search from "./SearchComponent.vue";
import icons from "./NavBarIcons.vue";

export default {
  name: "navbar",
  components: { search, icons },
  data() {
    return {
      logo: {
        id: 1,
        name: "logo",
        path: "social-logo.png",
        link: "./index.html",
      },
    };
  },
  methods: {
    getImgUrl(pic) {
      const images = require.context("../../images/", false, /\.png$/);
      return images("./" + pic);
    },
    toggleMenu() {
      const contentContainer = Array.from(
        document.querySelector(".content-container").children
      );
      const homeContainer = document.querySelector(".home-nav-container");
      const iconsRoot = document.querySelector(".icons-root");
      homeContainer.classList.toggle("toggle-posts");
      iconsRoot.classList.toggle("toggle");
      contentContainer.forEach((element) =>
        !element.classList.contains("home-nav-container")
          ? element.classList.toggle("toggle")
          : element
      );
    },
  },
};
</script>

<style>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  height: 65px;
  padding: 5px;
  background-color: #3b5998;
  z-index: 999;
}
.logo {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.hamburger-menu {
  display: none;
  padding: 5px;
  border-radius: 10px;
}
.hamburger-menu:hover {
  background-color: rgb(0, 0, 0, 0.2);
}
@media screen and (max-width: 950px) {
  .hamburger-menu {
    display: flex;
  }
}
</style>
