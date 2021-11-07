<template>
  <div class="photo-container">
    <div class="photo-container_sub-container">
      <img
        class="cover-photo"
        src="https://via.placeholder.com/600/8985dc"
        alt="cover-photo"
      />
      <img
        class="profile-photo"
        src="https://via.placeholder.com/600/771796"
        alt="profile-photo"
      />
    </div>
    <h1 class="photo-container_sub-container_name">{{ getUserName }}</h1>
  </div>
</template>

<script>
export default {
  name: "PhotoComponent",
  computed: {
    getUserName() {
      const urlParams = new URLSearchParams(window.location.search);
      const user = urlParams.get("user");
      return user;
    },
  },
};
</script>

<style scoped>
.photo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 65px;
}
.photo-container_sub-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 300px;
}
.photo-container_sub-container_name {
  margin: 20px 0 0 0;
}
.cover-photo {
  width: 100%;
  height: 300px;
  border-radius: 0 0 10px 10px;
}
.profile-photo {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 180px;
  height: 180px;
  margin-left: -90px;
  border: 5px solid white;
  border-radius: 50%;
}
.toggle {
  display: none;
}
</style>
