<template>
  <div class="left-nav-container">
    <a
      class="item-container"
      v-for="item in menu"
      :key="item.id"
      :href="item.path"
    >
      {{ item.text }}
    </a>
  </div>
</template>

<script>
export default {
  name: "LeftNav",
  data() {
    return {
      menu: [
        {
          id: 1,
          text: "Simone",
          path: "./index.html",
        },
        {
          id: 2,
          text: "Friends",
          path: "./index.html",
        },
        {
          id: 3,
          text: "Groups",
          path: "./index.html",
        },
        {
          id: 4,
          text: "Market",
          path: "./index.html",
        },
        {
          id: 5,
          text: "Watch",
          path: "./index.html",
        },
        {
          id: 6,
          text: "Memories",
          path: "./index.html",
        },
        {
          id: 7,
          text: "Saved",
          path: "./index.html",
        },
        {
          id: 8,
          text: "Ad Center",
          path: "./index.html",
        },
        {
          id: 9,
          text: "Ads Manager",
          path: "./index.html",
        },
        {
          id: 10,
          text: "Community Help",
          path: "./index.html",
        },
        {
          id: 11,
          text: "Covid-19",
          path: "./index.html",
        },
        {
          id: 12,
          text: "Events",
          path: "./index.html",
        },
        {
          id: 13,
          text: "Favourites",
          path: "./index.html",
        },
        {
          id: 14,
          text: "Jobs",
          path: "./index.html",
        },
        {
          id: 15,
          text: "Most recents",
          path: "./index.html",
        },
        {
          id: 16,
          text: "Pages",
          path: "./index.html",
        },
      ],
    };
  },
};
</script>

<style>
.left-nav-container {
  display: flex;
  flex-direction: column;
  width: 180px;
  padding: 20px 10px;
  top: 65px;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: white;
}
.item-container {
  background-color: white;
  padding: 20px;
  cursor: pointer;
  color: black;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
}
.item-container:hover {
  background-color: rgb(0, 0, 0, 0.2);
}
</style>
