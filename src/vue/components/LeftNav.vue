<template>
  <div class="left-nav-container">
    <a
      class="item-container"
      v-for="item in menu"
      :key="item.id"
      :href="item.path"
    >
      <img
        class="item-container_image"
        :src="getImgUrl(item.image)"
        :alt="item.text"
      />
      <span class="item-container_link">
        {{ item.text }}
      </span>
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
          text: "John",
          path: "./index.html",
          image: "avatar-black.png",
        },
        {
          id: 2,
          text: "Friends",
          path: "./index.html",
          image: "friends.png",
        },
        {
          id: 3,
          text: "Groups",
          path: "./index.html",
          image: "groups.png",
        },
        {
          id: 4,
          text: "Market",
          path: "./index.html",
          image: "market.png",
        },
        {
          id: 5,
          text: "Watch",
          path: "./index.html",
          image: "watch.png",
        },
        {
          id: 6,
          text: "Memories",
          path: "./index.html",
          image: "memories.png",
        },
        {
          id: 7,
          text: "Saved",
          path: "./index.html",
          image: "saved.png",
        },
        {
          id: 8,
          text: "Ad Center",
          path: "./index.html",
          image: "ad-center.png",
        },
        {
          id: 9,
          text: "Ads Manager",
          path: "./index.html",
          image: "ad-manager.png",
        },
        {
          id: 10,
          text: "Community Help",
          path: "./index.html",
          image: "community.png",
        },
        {
          id: 11,
          text: "Covid-19",
          path: "./index.html",
          image: "covid.png",
        },
        {
          id: 12,
          text: "Events",
          path: "./index.html",
          image: "events.png",
        },
        {
          id: 13,
          text: "Favourites",
          path: "./index.html",
          image: "favourites.png",
        },
        {
          id: 14,
          text: "Jobs",
          path: "./index.html",
          image: "jobs.png",
        },
        {
          id: 15,
          text: "Most recents",
          path: "./index.html",
          image: "recents.png",
        },
        {
          id: 16,
          text: "Pages",
          path: "./index.html",
          image: "pages.png",
        },
      ],
    };
  },
  methods: {
    getImgUrl(pic) {
      const images = require.context("../../images/", false, /\.png$/);
      return images("./" + pic);
    },
  },
};
</script>

<style scoped>
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
}
.item-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: black;
  text-decoration: none;
}
.item-container:hover {
  background-color: rgb(0, 0, 0, 0.2);
}
.item-container_image {
  width: 35px;
  height: auto;
  margin-right: 10px;
}
@media screen and (max-width: 950px) {
  .left-nav-container {
    display: none;
    top: 110px;
  }
  .toggle {
    display: flex;
    width: 50%;
    padding: 0;
  }
}
</style>
