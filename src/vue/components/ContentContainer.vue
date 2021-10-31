<template>
  <div class="content-container">
    <left-nav />
    <home-nav />
    <right-nav />
  </div>
</template>

<script>
import LeftNav from "./LeftNav.vue";
import HomeNav from "./HomeNav.vue";
import RightNav from "./RightNav.vue";

export default {
  name: "ContentContainer",
  components: { LeftNav, HomeNav, RightNav },
};
</script>

<style scoped>
.content-container {
  display: flex;
}
</style>
