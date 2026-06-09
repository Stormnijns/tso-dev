<script setup lang="ts">
import { RouterLink } from 'vue-router'
defineProps<{
  rank: number
  userId: string | number
  name: string
  value: number
  avatar?: string
}>()
</script>

<template>
  <RouterLink class="entry" :to="{ path: '/tracker', query: { user: userId } }">
    <div class="rank">#{{ rank }}</div>

    <img
      class="avatar"
      :src="
        avatar ||
        'https://www.roblox.com/headshot-thumbnail/image?userId=' +
          userId +
          '&width=150&height=150&format=png'
      "
      alt=""
    />

    <div class="info">
      <div class="name">{{ name }}</div>
      <div class="sub">ID: {{ userId }}</div>
    </div>

    <div class="kills">{{ value }} kills</div>
  </RouterLink>
</template>

<style scoped>
.entry {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 12px;
  margin: 8px 0;

  background: #181a21;
  border: 1px solid #232630;
  border-radius: 10px;
}

.rank {
  width: 40px;
  font-weight: bold;
  color: #aaa;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid #2a2f3a;
  margin-right: 10px;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.name {
  color: white;
  font-weight: 600;
}

.sub {
  font-size: 12px;
  color: #888;
}

.kills {
  font-weight: bold;
  color: #00ff99;
}
</style>
