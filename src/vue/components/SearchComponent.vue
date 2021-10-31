<template>
  <div
    class="search-container"
    @click="toggleDropdown"
    tabindex="0"
  >
    <div class="magnifying-container">
      <img
        class="magnifying-container_magnifying"
        :src="getImgUrl(magnifying.link)"
        alt="Magnifying glass"
      />
    </div>
    <div class="search-form">
      <input
        class="search-form_input"
        type="text"
        placeholder="Search on Social..."
        @blur="closeDropdown"
        @keyup="
          debounce(() => {
            updateStore($event);
          })
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchComponent",
  data() {
    return {
      magnifying: {
        id: 1,
        text: "Magnifying glass",
        link: "magnifying.png",
      },
    };
  },
  setup() {
    function createDebounce() {
      let timeout = null;
      return function (fnc) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fnc();
        }, 250);
      };
    }

    return {
      debounce: createDebounce(),
    };
  },
  methods: {
    getImgUrl(pic) {
      const images = require.context("../../images/", false, /\.png$/);
      return images("./" + pic);
    },
    toggleDropdown() {
      const magnifying = document.querySelector(".magnifying-container");
      if (magnifying.classList.contains("hide-magnifying")) {
        return;
      }
      magnifying.classList.add("hide-magnifying");
    },
    closeDropdown() {
      const magnifying = document.querySelector(".magnifying-container");
      magnifying.classList.remove("hide-magnifying");
    },
    updateStore(event) {
      const word = event.target.value;
      this.$store.commit("update", word);
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 400px;
  padding: 10px;
  margin: 5px;
  border-radius: 25px;
  background-color: white;
  cursor: text;
}
input.search-form_input:focus {
  outline-width: 0;
}
.magnifying-container {
  width: 25px;
  margin-right: 10px;
  transition: width 0.5s;
}
.magnifying-container_magnifying {
  width: 100%;
  height: auto;
}
.search-form {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
.search-form_input {
  width: 100%;
  border: 0;
  color: black;
  text-align: left;
}
.hide-magnifying {
  width: 0;
}
@media (max-width: 1000px) {
  .search-container {
    width: 200px;
  }
}
</style>
