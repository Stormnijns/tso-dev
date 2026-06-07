<script setup>
import InfoCard from '@/components/InfoCard.vue'
</script>

<template>
  <main>
    <h1>Homepage</h1>
    <h3>Under construction</h3>

    <div id="info-cards">
      <info-card title="Recent" description="Balance changes" image="balance_icon.png" />
      <info-card title="Competitive" description="Ranking system" image="rank_icon.png" />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
}

#info-cards {
  display: flex;
  margin-top: 1rem;
  gap: 2rem;
}
</style>
