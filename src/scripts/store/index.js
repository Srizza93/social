import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      keyWord: "",
      usersData: {
        users: { id: 1, data: [] },
        posts: { id: 2, data: [] },
        albums: { id: 3, data: [] },
        photos: { id: 4, data: [] },
        comments: { id: 5, data: [] },
      },
    };
  },
  mutations: {
    updateKeyWord(state, word) {
      state.keyWord = word;
    },
    updateUsersData(state, data) {
      state.usersData[data.label].data = data;
    },
    addPost(state, post) {
      state.usersData.posts.data.unshift(post);
    },
    addComment(state, data) {
      const postId = data[0];
      const comment = data[1];
      let postComments = state.usersData.posts.data.find(
        (post) => post.id === postId
      );
      postComments.comments
        ? postComments.comments.unshift(comment)
        : (postComments.comments = [comment]);
    },
  },
  getters: {
    homePosts(state) {
      return state.usersData.posts.data.map((post, index) => {
        const authorData = state.usersData.users.data.find(
          (user) => user.id === post.userId
        );
        const urlData = state.usersData.photos.data[index];
        const titleData = state.usersData.photos.data[index];
        let commentsData = state.usersData.comments.data.filter(
          (comment) => comment.postId === post.id
        );
        return {
          id: post.id,
          author: authorData ? authorData.name : post.author,
          image: urlData ? urlData.url : "",
          alt: titleData ? titleData.title : "",
          body: post.body,
          comments: post.comments
            ? post.comments.concat(commentsData)
            : commentsData,
        };
      });
    },
    contacts(state) {
      return state.usersData.users.data.map((user, index) => {
        const urlData = state.usersData.photos.data[index];
        return {
          id: user.id,
          name: user.name,
          image: urlData ? urlData.url : "",
        };
      });
    },
  },
  actions: {
    async apiCall({ commit }, item) {
      try {
        const url = `https://jsonplaceholder.typicode.com/${item}`;
        return fetch(url)
          .then((response) => response.json())
          .then((data) => {
            data.label = item;
            if (item === "posts") {
              data.sort(() => 0.5 - Math.random());
            }
            commit("updateUsersData", data);
          });
      } catch (error) {
        console.log("Can't get data from API: " + error);
      }
    },
  },
});
