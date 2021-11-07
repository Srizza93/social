<template>
  <div class="right-nav-container">
    <span class="right-nav-container_title">Contacts</span>
    <div
      class="right-nav-container_contacts-container"
      v-for="contact in getContacts"
      :key="contact.id"
      @click="openChat(contact.name, contact.image)"
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
    <div class="chat">
      <div class="chat_name-container">
        <img
          class="right-nav-container_contacts-container_users-img chat_img"
          :alt="'-profile-photo'"
        />
        <span class="chat_name-container_user-name"></span>
        <span
          class="icons-container_dropdown-container_ul_item_close"
          @click="closeChat"
          >x</span
        >
      </div>
      <div class="chat_messages">
        <div
          class="chat_messages_message"
          v-for="message in messages"
          :key="message.id"
        >
          <span class="chat_messages_message_me">Me</span>
          <span>{{ message }}</span>
        </div>
      </div>
      <div class="chat_input-container">
        <input
          class="chat_input-container_input"
          type="text"
          placeholder="Type here..."
          v-model="message"
        />
        <img
          class="chat_input-container_img"
          :src="getImgUrl('send.png')"
          alt="send-icon"
          @click="sendMessage"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightNav",
  data() {
    return {
      user: "",
      message: "",
      messages: [],
    };
  },
  computed: {
    getContacts() {
      return this.$store.getters.contacts;
    },
  },
  methods: {
    getImgUrl(pic) {
      const images = require.context("../../images/", false, /\.png$/);
      return images("./" + pic);
    },
    openChat(userName, userImg) {
      const chat = document.querySelector(".chat");
      const name = document.querySelector(".chat_name-container_user-name");
      const img = document.querySelector(".chat_img");
      name.innerHTML = userName;
      img.src = userImg;
      chat.classList.add("show-chat");
      this.user = name;
      this.updateMessages();
    },
    closeChat() {
      const chat = document.querySelector(".chat");
      chat.classList.remove("show-chat");
      this.user = "";
    },
    sendMessage() {
      if (this.message.length === 0) {
        return;
      }
      const author = document.querySelector(
        ".chat_name-container_user-name"
      ).innerHTML;
      this.$store.commit("addMessage", [author, this.message]);
      this.updateMessages();
      this.message = "";
    },
    updateMessages() {
      this.messages = this.getContacts.find(
        (contact) => contact.name === this.user.innerHTML
      ).messages;
    },
  },
};
</script>

<style scoped>
.right-nav-container {
  display: flex;
  flex-direction: column;
  width: 180px;
  padding: 20px 10px;
  top: 65px;
  right: 0;
  bottom: 0;
  font-size: 15px;
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
  border-radius: 10px;
  cursor: pointer;
}
.right-nav-container_contacts-container:hover {
  background-color: rgb(0, 0, 0, 0.2);
}
.chat {
  display: none;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 50px;
  width: 200px;
  height: 300px;
  padding: 10px;
  box-shadow: 5px 10px 8px #888888;
  border-radius: 10px 0 0 0;
  background-color: white;
}
.chat_name-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}
.chat_input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: auto;
}
.chat_input-container_input {
  border: none;
}
.chat_input-container_input:focus {
  outline-width: 0;
}
.chat_input-container_img {
  width: 35px;
  height: 35px;
  cursor: pointer;
}
.chat_input-container_img:hover {
  opacity: 0.9;
}
.show-chat {
  display: flex;
}
.chat_messages {
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
}
.chat_messages_message {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 5px;
  color: white;
  background-color: rgb(0, 132, 255);
  border-radius: 10px;
  word-break: break-word;
}
.chat_messages_message_me {
  font-size: 13px;
  font-weight: 600;
}
@media screen and (max-width: 950px) {
  .right-nav-container {
    display: none;
    top: 110px;
  }
  .toggle {
    display: flex;
    padding: 0;
    left: 50%;
  }
}
@media screen and (max-width: 350px) {
  .toggle {
    width: 50%;
    word-break: break-word;
  }
  }
</style>
