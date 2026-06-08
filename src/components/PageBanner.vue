<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true,
  },
})
const imageUrl = (img: string) =>
  new URL(`../assets/${img}`, import.meta.url).href
</script>

<template>
  <div
    class="banner"
    :style="{ backgroundImage: `url(${imageUrl(image)})` }"
  ></div>
</template>

<style scoped>
.banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40vh;

  background-size: cover;
  background-position: center;

  z-index: 0;
}

.banner::after {
  content: "";
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6) 10%,
    rgba(0, 0, 0, 0.75) 33%,
    rgba(0, 0, 0, 0.9) 50%,
    var(--vt-c-black) 100%
  );
}
</style>
