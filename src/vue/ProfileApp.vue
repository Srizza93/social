<template>
  <div class="sub-root">
    <navbar />
    <div class="content-container">
      <photo-component />
      <left-nav />
      <posts-component :posts="getUserPosts" />
      <right-nav />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";
import LeftNav from "./components/LeftNav.vue";
import PostsComponent from "./components/PostsComponent.vue";
import RightNav from "./components/RightNav.vue";
import PhotoComponent from "./components/PhotoComponent.vue";

export default {
  name: "App",
  components: { Navbar, LeftNav, PostsComponent, RightNav, PhotoComponent },
  computed: {
    getUserPosts() {
      const urlParams = new URLSearchParams(window.location.search);
      const user = urlParams.get("user");
        console.log(this.$store);
      return this.$store.getters.homePosts.filter(
        (post) => post.author === user || post.author === "John Doe"
      );
    },
  },
};
</script>

<style scoped>
.sub-root {
  display: flex;
  flex-direction: column;
}
</style>
