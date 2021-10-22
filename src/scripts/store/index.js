import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      keyWord: "",
    };
  },
  mutations: {
    update (state, word) {
      state.keyWord = word;
    },
  }
});
