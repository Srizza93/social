<template>
  <div class="sub-root">
    <navbar />
    <content-container />
  </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";
import ContentContainer from "./components/ContentContainer.vue";

export default {
  name: "App",
  components: { Navbar, ContentContainer },
};
</script>

<style></style>
