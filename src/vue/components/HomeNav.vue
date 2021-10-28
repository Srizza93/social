<template>
  <div class="home-nav-container">
    <div class="posts" v-for="post in getHomePosts" :key="post.id">
      <span class="posts_author">{{ post.author }}</span>
      <p class="posts_body">{{ post.body }}</p>
      <img class="posts_image" :src="post.image" :alt="post.alt" />
      <span class="posts_comments" @click="toggleComments"
        >{{ post.comments.length }} Comments</span
      >
      <div class="posts_comments_comments-list">
        <div
          class="posts_comments_comments-list_comment"
          v-for="comment in post.comments"
          :key="comment.id"
        >
          <h4>{{ getUserFromEmail(comment.email) }}</h4>
          <span>{{ comment.body }}</span>
        </div>
      </div>
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
  methods: {
    getUserFromEmail(email) {
      return email.substring(0, email.indexOf("@")).replace(/[.]|[_]/, " ");
    },
    toggleComments(event) {
      const list = Array.from(event.target.parentElement.children).find(
        (element) => element.classList.contains("posts_comments_comments-list")
      );
      list.classList.toggle("posts_comments_comments-list-show");
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
.posts_comments_comments-list {
  display: none;
  flex-direction: column;
  padding: 10px 20px 20px 20px;
}
.posts_comments_comments-list-show {
  display: flex;
}
</style>
