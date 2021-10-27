<template>
  <div class="home-nav-container">
    <div class="posts" v-for="post in getHomePosts" :key="post.id">
      <h3>{{ post.author }}</h3>
      <img class="posts_image" :src="post.image" :alt="post.alt" />
      <p class="posts_body">{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import "regenerator-runtime/runtime";

export default {
  name: "HomeNav",
  computed: {
    getHomePosts() {
      return this.$store.getters.postsWithUsers;
    },
  },
  created() {
    const lists = ["users", "posts", "albums", "photos", "comments"];
    lists.forEach((list) => this.$store.dispatch("apiCall", list));
  },
};
</script>

<style scoped>
.home-nav-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 80px auto 40px auto;
}
.posts {
  margin: 40px 0;
}
.posts_image {
  max-width: 400px;
  height: auto;
}
.posts_body {
  max-width: 400px;
}
</style>
