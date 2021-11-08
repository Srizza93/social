<template>
  <div class="home-nav-container">
    <div class="create-post">
      <input
        class="create-post_input"
        type="text"
        placeholder="What's on your mind?"
        v-model="post"
      />
      <button class="publish_button create-post_button" @click="addPost">
        Post
      </button>
    </div>
    <div class="posts" v-for="post in posts" :key="post.id">
      <div class="posts_author-container">
        <img
          class="posts_profile-photo"
          :src="post.image"
          alt="profile-photo"
        />
        <span class="posts_author" @click="openProfile(post.author)">{{
          post.author
        }}</span>
      </div>
      <p class="posts_body">{{ post.body }}</p>
      <img class="posts_image" :src="post.image" :alt="post.alt" />
      <span class="posts_comments" @click="toggleComments">
        <span v-if="post.comments.length">{{ post.comments.length }}</span>
        Comments
      </span>
      <div class="posts_comments_comments-list">
        <div class="create-comment">
          <input
            class="create-post_input create-comment_input"
            type="text"
            placeholder="What's on your mind?"
            v-model="comment"
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
          <div class="posts_author-container">
            <img
              class="posts_profile-photo"
              :src="post.image"
              alt="profile-photo"
            />
            <span class="posts_author">{{
              getUserFromEmail(comment.email)
            }}</span>
          </div>
          <p class="posts_comments_comments-list_comment_posts_comment">
            {{ comment.body }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "regenerator-runtime/runtime";

export default {
  name: "PostsComponent",
  data() {
    return {
      post: "",
      comment: "",
    };
  },
  props: {
    posts: {
      type: Array,
      required: true,
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
      const input = document.querySelector(".create-post_input");
      if (this.textIsNotWritten(this.post, input)) {
        return;
      }
      const newPost = {
        id: this.$props.posts.length + 1,
        author: "John Doe",
        body: this.post,
        image: "https://via.placeholder.com/600/a77d08",
        comments: [],
      };
      this.$store.commit("addPost", newPost);
      this.post = "";
    },
    postComment(event, comments, postId) {
      const input = Array.from(event.target.parentElement.children).find(
        (element) => element.classList.contains("create-comment_input")
      );
      if (this.textIsNotWritten(this.comment, input)) {
        return;
      }
      const newComment = {
        id: comments.length + 1,
        email: "John.Doe@gmail.com",
        body: this.comment,
      };
      this.$store.commit("addComment", [postId, newComment]);
      this.comment = "";
    },
    textIsNotWritten(text, input) {
      const textLength = text.trim().length;
      if (textLength === 0) {
        input.value = "";
        input.placeholder = "Write something first...";
        return true;
      }
      input.placeholder = "What's on your mind?";
      return false;
    },
    openProfile(user) {
      window.open("./profile.html?user=" + encodeURI(user));
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
  opacity: 0.8;
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
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  background-color: white;
}
.posts_author-container {
  display: flex;
  flex-direction: row;
  padding: 10px 20px 0 20px;
  align-items: center;
  justify-content: left;
}
.posts_profile-photo {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.posts_author {
  font-size: 17px;
  font-weight: 600;
  padding: 10px 20px;
  cursor: pointer;
}
.posts_author:hover {
  text-decoration: underline;
}
.posts_body {
  padding: 0 20px 0 75px;
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
.posts_comments_comments-list_comment {
  background-color: #f0f2f5;
  margin: 10px 0;
  border-radius: 10px;
}
.posts_comments_comments-list_comment_posts_comment {
  padding: 0 20px 10px 75px;
  margin: 0;
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
