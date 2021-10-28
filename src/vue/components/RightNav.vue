<template>
  <div class="right-nav-container">
    <span class="right-nav-container_title">Contacts</span>
    <div
      class="right-nav-container_contacts-container"
      v-for="contact in getContacts"
      :key="contact.id"
    >
      <img
        class="right-nav-container_contacts-container_users-img"
        :src="contact.image"
        :alt="contact.name + '-profile-photo'"
      />
      <span class="right-nav-container_contacts-container_contact">{{
        contact.name
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightNav",
  computed: {
    getContacts() {
      return this.$store.getters.contacts;
    },
  },
};
</script>

<style>
.right-nav-container {
  display: flex;
  flex-direction: column;
  width: 180px;
  padding: 20px 10px;
  top: 65px;
  right: 0;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  word-break: keep-all;
}
.right-nav-container_contacts-container_users-img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 50%;
}
.right-nav-container_title {
  padding: 20px;
  font-size: 17px;
  color: #888888;
}
.right-nav-container_contacts-container {
  display: flex;
  flex-direction: row;
  padding: 20px;
  cursor: pointer;
}
.right-nav-container_contacts-container:hover {
  background-color: rgb(0, 0, 0, 0.2);
}
</style>
