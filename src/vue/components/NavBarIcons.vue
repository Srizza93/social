<template>
  <div class="icons-root">
    <div class="icons-container" v-for="icon in icons" :key="icon.id">
      <div class="icons-container_img-container">
        <img
          class="icons-container_img-container_icon"
          :src="getImgUrl(icon.path)"
          :alt="icon.name"
          @click="toggleDropdown"
          tabindex="0"
        />
        <span
          class="icons-container_img-container_items-length-container"
          v-if="icon.list && icon.list.length && icon.name !== 'avatar'"
        >
          {{ icon.list.length }}
        </span>
      </div>
      <div
        class="icons-container_dropdown-container"
        v-if="icon.list && icon.list.length"
      >
        <ul class="icons-container_dropdown-container_ul">
          <li
            class="icons-container_dropdown-container_ul_item"
            v-for="item in icon.list"
            :key="icon.name + item.id"
            :pkey="icon.id"
          >
            <a
              class="icons-container_dropdown-container_ul_item_link"
              href="./index.html"
              >{{ item.text }}</a
            >
            <div
              class="icons-container_dropdown-container_ul_item_interspace"
              v-if="icon.name !== 'avatar'"
            ></div>
            <span
              class="icons-container_dropdown-container_ul_item_close"
              v-if="icon.name !== 'avatar'"
              @click="deleteItem"
              >x</span
            >
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
  mounted() {
    document.addEventListener("click", this.eventDelegation);
  },
  methods: {
    getImgUrl(pic) {
      const images = require.context("../../images/", false, /\.png$/);
      return images("./" + pic);
    },
    eventDelegation(e) {
      const clicked = e.target;
      if (
        (clicked.classList.contains("icons-container_img-container_icon") &&
          clicked.alt !== "home") ||
        clicked.classList.contains(
          "icons-container_dropdown-container_ul_item_close"
        )
      ) {
        return;
      }
      this.closeDropdown();
    },
    toggleDropdown(e) {
      let dropdown = Array.from(
        e.target.parentElement.parentElement.children
      ).find((element) =>
        element.classList.contains("icons-container_dropdown-container")
      );
      if (!dropdown) {
        return;
      }
      const openDropdowns = document.querySelector(".show-dropdown");
      dropdown.classList.toggle("show-dropdown");
      if (openDropdowns) {
        openDropdowns.classList.remove("show-dropdown");
      }
    },
    closeDropdown() {
      const dropdown = document.querySelector(".show-dropdown");
      if (dropdown) {
        dropdown.classList.remove("show-dropdown");
      }
    },
    deleteItem(e) {
      const clickedItem = Array.from(e.target.parentElement.children).find(
        (element) =>
          element.classList.contains(
            "icons-container_dropdown-container_ul_item_link"
          )
      );
      this.icons = this.icons.map((icon) => {
        return {
          id: icon.id,
          name: icon.name,
          path: icon.path,
          list: this.iconHasList(icon.list, clickedItem),
        };
      });
    },
    iconHasList(list, target) {
      if (!list) {
        return;
      }
      return list.filter((item) => {
        return item.text !== target.textContent;
      });
    },
  },
};
</script>

<style>
.icons-root {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
}
.icons-container {
  margin: 0 5px;
}
.icons-container_img-container {
  position: relative;
}
.icons-container_img-container_icon {
  width: 35px;
  height: auto;
  cursor: pointer;
}
.icons-container_img-container_items-length-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  left: 30px;
  width: 18px;
  height: 18px;
  margin-left: auto;
  border-radius: 50%;
  background-color: red;
  font-size: 12px;
  color: white;
  text-align: center;
  cursor: pointer;
}
.icons-container_img-container_icon:hover {
  opacity: 0.7;
}
.icons-container_dropdown-container {
  display: none;
  position: absolute;
  top: 80px;
  right: 25px;
  width: max-content;
  background-color: white;
  box-shadow: 5px 10px 8px #888888;
  border-radius: 10px;
}
.show-dropdown {
  display: block;
}
.icons-container_dropdown-container_ul {
  padding: 10px;
}
.icons-container_dropdown-container_ul_item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;
  padding: 5px;
}
.icons-container_dropdown-container_ul_item_link {
  text-decoration: none;
  color: black;
}
.icons-container_dropdown-container_ul_item_link:hover {
  text-decoration: underline;
}
.icons-container_dropdown-container_ul_item_interspace {
  width: 20px;
}
.icons-container_dropdown-container_ul_item_close {
  margin-left: auto;
  cursor: pointer;
}
@media screen and (max-width: 950px) {
  .icons-root {
    display: none;
    position: absolute;
    width: 100%;
    right: 0;
    top: 64px;
    padding: 5px;
    justify-content: center;
    background-color: #3b5998;
  }

  .toggle {
    display: flex;
  }
}
</style>
