<template>
  <div class="home-nav-container">
    <div class="posts" v-for="post in getHomePosts" :key="post.id">
      <span class="posts_author">{{ post.author }}</span>
      <p class="posts_body">{{ post.body }}</p>
      <img class="posts_image" :src="post.image" :alt="post.alt" />
      <span class="posts_comments">Comments</span>
    </div>
  </div>
</template>

<script>
import "regenerator-runtime/runtime";

export default {
  name: "HomeNav",
  computed: {
    getHomePosts() {
      return this.$store.getters.users;
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
  display: flex;
  flex-direction: column;
  max-width: 600px;
  padding: 20px 0;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 5px 10px 8px #888888;
  background-color: white;
}
.posts_author {
  font-size: 17px;
  font-weight: 600;
  padding: 10px 20px;
}
.posts_body {
  padding: 10px 20px;
  margin: 0;
}
.posts_image {
  max-width: 600px;
  height: auto;
  padding-top: 10px;
}
.posts_comments {
  padding: 10px 20px;
  margin-left: auto;
  color: #888888;
  cursor: pointer;
}
.posts_comments:hover {
  text-decoration: underline;
}
</style>
