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
  },
  getters: {
    postsWithUsers(state) {
      return state.usersData.posts.data
        .map((post) => {
          return {
            id: post.id,
            author: state.usersData.users.data.find((user) => {
              return user.id === post.userId;
            }).name,
            body: post.body,
          };
        })
        .sort(() => 0.5 - Math.random());
    },
  },
  actions: {
    updateAsyncUsersData({ commit }, data) {
      commit("updateUsersData", data);
    },
  },
});
