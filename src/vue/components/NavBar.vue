<template>
  <div class="navbar">
    <a :href="logo.link">
      <img class="logo" :src="getImgUrl(logo.path)" :alt="logo.name" />
    </a>
    <search />
    <icons />
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
  },
};
</script>

<style>
.navbar {
  display: flex;
  flex-direction: row;
  position: fixed;
  width: 100%;
  height: 65px;
  padding: 5px;
  background-color: #3b5998;
}
.logo {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
</style>
