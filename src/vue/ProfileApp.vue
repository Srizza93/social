<template>
  <div class="sub-root">
    <navbar />
    <posts-component :posts="getUserPosts" />
  </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";
import PostsComponent from "./components/PostsComponent.vue";

export default {
  name: "App",
  components: { Navbar, PostsComponent },
  computed: {
    getUserPosts() {
      const urlParams = new URLSearchParams(window.location.search);
      const user = urlParams.get("user");
      return this.$store.getters.homePosts.filter(
        (post) => post.author === user
      );
    },
  },
};
</script>
