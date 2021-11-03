<template>
  <div class="search-container" @click="toggleDropdown" tabindex="0">
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
        tabindex="0"
        @keyup="
          debounce(() => {
            updateStore($event);
          })
        "
      />
    </div>
    <div class="search-dropdown-container">
      <span class="no-results" v-if="getUsers.length <= 0"
        >No results found</span
      >
      <div
        class="search-dropdown-container_user-container"
        v-for="user in getUsers"
        :key="user.id"
        @click="openProfile(user.name)"
      >
        <img
          class="search-dropdown-container_user-container_profile-photo"
          src="https://via.placeholder.com/600/a77d08"
          alt="profile-photo"
        />
        <span class="search-dropdown-container_user-container_user-name">{{
          user.name
        }}</span>
      </div>
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
  mounted() {
    document.addEventListener("click", this.eventDelegation);
  },
  methods: {
    getImgUrl(pic) {
      const images = require.context("../../images/", false, /\.png$/);
      return images("./" + pic);
    },
    eventDelegation(e) {
      const excludedClasses = [
        "search-dropdown-container_user-container_profile-photo",
        "search-dropdown-container_user-container_user-name",
        "search-dropdown-container_user-container",
        "search-dropdown-container",
        "search-form_input",
      ];
      const clickedClasses = e.target.classList;
      for (let i = 0; i < clickedClasses.length; i++) {
        if (excludedClasses.includes(clickedClasses[i])) {
          return;
        }
      }
      this.closeDropdown();
    },
    toggleDropdown() {
      const magnifying = document.querySelector(".magnifying-container");
      const dropdown = document.querySelector(".search-dropdown-container");
      dropdown.classList.toggle("show-users-dropdown");
      if (magnifying.classList.contains("hide-magnifying")) {
        return;
      }
      magnifying.classList.add("hide-magnifying");
    },
    closeDropdown() {
      const magnifying = document.querySelector(".magnifying-container");
      const dropdown = document.querySelector(".search-dropdown-container");
      magnifying.classList.remove("hide-magnifying");
      dropdown.classList.remove("show-users-dropdown");
    },
    updateStore(event) {
      const word = event.target.value;
      this.$store.commit("updateKeyWord", word);
    },
    openProfile(user) {
      window.open("./profile.html?user=" + encodeURI(user));
    },
  },
  computed: {
    getUsers() {
      return this.$store.getters.searchedUsers;
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
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
.search-dropdown-container {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 35px;
  width: calc(100% - 20px);
  max-height: 400px;
  height: fit-content;
  padding: 20px 20px 10px 20px;
  border-radius: 0 0 10px 10px;
  background-color: white;
  box-shadow: 5px 10px 8px #888888;
  overflow: scroll;
}
.show-users-dropdown {
  display: flex;
}
.search-dropdown-container_user-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
.search-dropdown-container_user-container:hover {
  background-color: rgb(0, 0, 0, 0.2);
}
.search-dropdown-container_user-container_profile-photo {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.search-dropdown-container_user-container_user-name {
  padding: 10px;
}
.no-results {
  color: #888888;
}
@media (max-width: 950px) {
  .search-container {
    width: 200px;
  }
}
@media (max-width: 350px) {
  .search-dropdown-container_user-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
