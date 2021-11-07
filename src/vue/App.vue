<template>
  <div class="sub-root">
    <navbar />
    <div class="content-container">
      <left-nav />
      <posts-component :posts="getHomePosts" />
      <right-nav />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";
import LeftNav from "./components/LeftNav.vue";
import PostsComponent from "./components/PostsComponent.vue";
import RightNav from "./components/RightNav.vue";

export default {
  name: "App",
  components: { Navbar, LeftNav, PostsComponent, RightNav },
  computed: {
    getHomePosts() {
      return this.$store.getters.homePosts;
    },
  },
  created() {
    const lists = ["users", "posts", "albums", "photos", "comments"];
    lists.forEach((list) => this.$store.dispatch("apiCall", list));
  },
};
</script>

<style scoped>
.sub-root {
  display: flex;
  flex-direction: column;
}
.content-container {
  display: flex;
}
</style>
