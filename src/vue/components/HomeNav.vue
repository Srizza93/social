<template>
  <div class="home-nav-container">
    <div class="posts" v-for="post in usersData[1].data" :key="post.id">
      <h3>{{ getUserName(post.userId) }}</h3>
      <p class="posts_name">{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import "regenerator-runtime/runtime";

export default {
  name: "HomeNav",
  data() {
    return {
      usersData: [
        { id: 1, name: "users", data: undefined },
        { id: 2, name: "posts", data: undefined },
        { id: 3, name: "albums", data: undefined },
        { id: 4, name: "photos", data: undefined },
        { id: 5, name: "comments", data: undefined },
      ],
    };
  },
  mounted() {
    this.xtmlHttpRequestMovies();
  },
  methods: {
    xtmlHttpRequestMovies() {
      const id = "616ff6d312a7d26bd78a9b2a";
      const self = this;
      this.usersData.forEach(async (data, i) => {
        let xhttp = new XMLHttpRequest();
        let url = `https://jsonplaceholder.typicode.com/${data.name}`;
        xhttp.open("GET", url, true);
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            self.usersData[i].data = JSON.parse(xhttp.response);
          }
        };
        xhttp.send(null);
      });
    },
    getUserName(postId) {
      return Array.from(this.usersData[0].data).find(
        (user) => user.id === postId
      ).name;
    },
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
