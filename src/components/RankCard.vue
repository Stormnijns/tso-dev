<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  rank: {
    type: String,
    required: true,
  },
})

const rankUrl = computed(() =>
  new URL(`../assets/ranks/${props.rank}.png`, import.meta.url).href
)

const rankColors: Record<string, string> = {
  platinum: '#6affd1',
  emerald: '#00ff00',
  diamond: '#00ddff',
  master: '#ff0066',
}
const glowStyle = computed(() => {
  const color = rankColors[props.rank]

  if (!color) return {}

  return {
    filter: `drop-shadow(0 0 3px ${color})`,
  }
})
</script>

<template>
  <div class="rankCard">
    <img :src="rankUrl" alt="" :style="glowStyle" />
    <h1>{{ rank.toUpperCase() }}</h1>
  </div>
</template>

<style scoped>
.rankCard {
  padding: 10px;
  border: 1px solid #232630;
  background: #181a21;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}
img {
  height: 5rem;
}
</style>
