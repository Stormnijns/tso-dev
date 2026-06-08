<script setup lang="ts">
import Banner from '@/components/PageBanner.vue'
</script>

<template>
  <main class="page">
    <Banner image="backgroundLb.png"/>
    <div class="content">
      <div id="leaderboard">
        <h1>Leaderboard</h1>
      </div>
    </div>
  </main>
</template>

<style scoped>
.page {
  position: relative;
  min-height: 50vh;
  padding: 20px;
  overflow: hidden;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#leaderboard {
  border: 1px solid #232630;
  background: #181a21;
  border-radius: 10px;
  padding: 1rem;
  width: 60%;
}
</style>
