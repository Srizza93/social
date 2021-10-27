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
        .map((post, index) => {
          const authorData = state.usersData.users.data.find(
            (user) => user.id === post.userId
          );
          const urlData = state.usersData.photos.data[index];
          const titleData = state.usersData.photos.data[index];
          return {
            id: post.id,
            author: authorData ? authorData.name : "",
            image: urlData ? urlData.url : "",
            alt: titleData ? titleData.title : "",
            body: post.body,
          };
        })
        .sort(() => 0.5 - Math.random());
    },
    contacts(state) {
      return state.usersData.users.data;
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
            commit("updateUsersData", data);
          });
      } catch (error) {
        console.log("Can't get data from API: " + error);
      }
    },
  },
});
