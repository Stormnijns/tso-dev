<script setup lang="ts">
import { RouterLink } from 'vue-router'
const props = defineProps({
  title: String,
  description: String,
  image: String,
  route: String,
})

const imageUrl = (name: string) => new URL(`../assets/images/${name}`, import.meta.url).href
</script>

<template>
  <RouterLink :to="route" class="info-card">
    <div class="left-side">
      <img class="image-icon" :src="imageUrl(props.image)" alt="" />
      <h1 class="green">{{ title }}</h1>
      <p>{{ description }}</p>
    </div>

    <div>
      <svg class="arrow-icon green" viewBox="0 0 24 24">
        <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
      </svg>
    </div>
  </RouterLink>
</template>

<style scoped>
.left-side {
  margin-right: 2rem;
}
.info-card {
  border: 1px solid #232630;
  border-radius: 10px;
  background: #181a21;
  padding: 1rem;
  display: flex;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.15s ease,
    border-color 0.15s ease;
  justify-content: space-between;
  align-items: flex-start;
}
.info-card:hover {
  transform: translateY(-3px);
  border-color: white;
  cursor: pointer;
}
.info-card:active {
  transform: translateY(0px);
}
.image-icon {
  width: auto;
  height: 130px;
}
.arrow-icon {
  width: 32px;
  height: 32px;
}
.green {
  padding: 0;
  font-size: 20px;
}
</style>
