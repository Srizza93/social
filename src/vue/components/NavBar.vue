<template>
  <div class="navbar">
    <img class="logo" :src="getImgUrl(logo.path)" :alt="logo.name" />
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
  width: 100%;
  padding: 5px;
  background-color: #3b5998;
}
.logo {
  width: 50px;
  height: 50px;
}
</style>
