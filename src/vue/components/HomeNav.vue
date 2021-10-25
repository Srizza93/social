<template>
  <div class="home-nav-container">
    <div class="posts" v-for="post in getHomePosts" :key="post.id">
      <h3>{{ post.author }}</h3>
      <p class="posts_name">{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import "regenerator-runtime/runtime";

export default {
  name: "HomeNav",
  methods: {
    async apiCall() {
      try {
        const lists = ["users", "posts", "albums", "photos", "comments"];
        lists.forEach(async (item) => {
          const url = `https://jsonplaceholder.typicode.com/${item}`;
          let response = await fetch(url);
          const data = await response.json();
          data.label = item;
          this.$store.dispatch("updateAsyncUsersData", data);
        });
      } catch (error) {
        console.log("Can't get data from API: " + error);
      }
    },
  },
  computed: {
    getHomePosts() {
      return this.$store.getters.postsWithUsers;
    },
  },
  created() {
    this.apiCall();
  },
};
</script>

<style scoped>
.home-nav-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 80px 20px 40px 200px;
}
.posts {
  margin: 40px 0;
}
</style>
