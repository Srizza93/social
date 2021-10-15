<template>
  <div class="icons-root">
    <div class="icons-container" v-for="icon in icons" :key="icon.id">
      <img
        class="icons-container_icon"
        :src="getImgUrl(icon.path)"
        :alt="icon.name"
        @click="toggleDropdown"
      />
      <div class="icons-container_dropdown-container" v-if="icon.list">
        <ul class="icons-container_dropdown-container_ul">
          <li
            class="icons-container_dropdown-container_ul_item"
            v-for="item in icon.list"
            :key="icon.name + item.id"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBarIcons",
  data() {
    return {
      icons: [
        {
          id: 1,
          name: "home",
          path: "home.png",
        },
        {
          id: 2,
          name: "chat",
          path: "chat.png",
          list: [
            {
              id: 1,
              text: "You have a message from Savannah",
            },
            {
              id: 2,
              text: "You have 1 lost video call",
            },
          ],
        },
        {
          id: 3,
          name: "notifications",
          path: "notifications.png",
          list: [
            {
              id: 1,
              text: "You have a friendship request",
            },
            {
              id: 2,
              text: "John liked your comment",
            },
            {
              id: 3,
              text: "There is an event near you tonight",
            },
          ],
        },
        {
          id: 4,
          name: "avatar",
          path: "avatar.png",
          list: [
            {
              id: 1,
              text: "Account",
            },
            {
              id: 2,
              text: "Settings",
            },
            {
              id: 3,
              text: "Privacy",
            },
          ],
        },
      ],
    };
  },
  methods: {
    getImgUrl(pic) {
      const images = require.context("../../images/", false, /\.png$/);
      return images("./" + pic);
    },
    toggleDropdown(e) {
      const icon = e.target.alt;
      const self = this;
      let dropdown = Array.from(e.target.parentElement.children).find(
        (element) =>
          element.classList.contains("icons-container_dropdown-container")
      );
      if (!dropdown) {
        return;
      }
      document.addEventListener("click", function(e) {
        self.dropdownBlur(e, icon);
      }, false);
      dropdown.classList.toggle("show-dropdown");
    },
    dropdownBlur(e, icon) {
      console.log(e.target, icon);
    },
  },
};
</script>

<style>
.icons-root {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
}
.icons-container {
  margin: 0 5px;
  cursor: pointer;
}
.icons-container_icon {
  width: 35px;
  height: auto;
}
.icons-container_icon:hover {
  opacity: 0.7;
}
.icons-container_dropdown-container {
  display: none;
  position: absolute;
  top: 80px;
  right: 25px;
  width: max-content;
  background-color: white;
  border: 2px solid #3b5998;
}
.show-dropdown {
  display: block;
}
.icons-container_dropdown-container_ul {
  padding: 10px;
}
.icons-container_dropdown-container_ul_item {
  list-style: none;
  padding: 5px;
}
</style>
