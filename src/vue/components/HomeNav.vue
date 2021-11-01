<template>
  <div class="home-nav-container">
    <div class="create-post">
      <input
        class="create-post_input"
        type="text"
        placeholder="What's on your mind?"
      />
      <button class="publish_button create-post_button" @click="addPost">
        Post
      </button>
    </div>
    <div class="posts" v-for="post in getHomePosts" :key="post.id">
      <span class="posts_author">{{ post.author }}</span>
      <p class="posts_body">{{ post.body }}</p>
      <img class="posts_image" :src="post.image" :alt="post.alt" />
      <span class="posts_comments" @click="toggleComments"
        >{{ post.comments.length }} Comments</span
      >
      <div class="posts_comments_comments-list">
        <div class="create-comment">
          <input
            class="create-post_input"
            type="text"
            placeholder="Comment something..."
          />
          <button
            class="publish_button create-comment_button"
            @click="postComment($event, post.comments, post.id)"
          >
            Post
          </button>
        </div>
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
      return this.$store.getters.homePosts;
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
    addPost() {
      const message = document.querySelector(".create-post_input");
      const newPost = {
        id: this.getHomePosts.length + 1,
        author: "John Doe",
        body: message.value,
        image: "https://via.placeholder.com/600/a77d08",
        comments: [],
      };
      this.$store.commit("addPost", newPost);
    },
    postComment(event, comments, postId) {
      const message = Array.from(event.target.parentElement.children).filter(
        (element) => element.classList.contains("create-post_input")
      )[0];
      const newComment = {
        id: comments.length + 1,
        email: "John.Doe@gmail.com",
        body: message.value,
      };
      this.$store.commit("addComment", [postId, newComment]);
    },
  },
  created() {
    const lists = ["users", "posts", "albums", "photos", "comments"];
    lists.forEach((list) => this.$store.dispatch("apiCall", list));
  },
};
</script>

<style>
.home-nav-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 80px auto 40px auto;
}
.create-post {
  display: flex;
  justify-content: center;
  max-width: 600px;
  width: 100%;
  height: 50px;
  padding: 10px;
  background-color: white;
  box-shadow: 5px 10px 8px #888888;
  border-radius: 10px;
}
.create-post_input {
  width: 100%;
  border: 0;
}
.create-post_input:focus {
  outline: none;
}
.publish_button {
  width: 70px;
  color: white;
  border-radius: 5px;
  border: none;
  font-weight: 600;
  cursor: pointer;
}
.publish_button:hover {
  opacity: .8;
}
.create-post_button {
  background-color: #008009;
}
.posts {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
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
  font-size: 16px;
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
.create-comment {
  display: flex;
  flex-direction: row;
  height: 30px;
  margin: 20px;
}
.create-comment_button {
  background-color: #3b5998;
}
@media screen and (max-width: 950px) {
  .toggle-posts {
    display: none;
  }
}
</style>
