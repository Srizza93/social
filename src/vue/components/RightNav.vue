<template>
  <div class="right-nav-container">
    <span class="right-nav-container_title">Contacts</span>
    <div
      class="right-nav-container_contacts-container"
      v-for="contact in getContacts"
      :key="contact.id"
    >
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
  background-color: white;
}
.right-nav-container_title {
  padding: 20px;
  font-size: 17px;
  color: gray;
}
.right-nav-container_contacts-container {
  padding: 20px;
}
</style>
