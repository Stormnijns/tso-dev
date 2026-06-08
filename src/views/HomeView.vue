<script setup>
import InfoCard from '@/components/InfoCard.vue'
import Banner from '@/components/PageBanner.vue'
</script>

<template>
  <main class="page">
    <Banner image="background1.png"/>

    <div class="content">
      <div id="info-cards">
        <InfoCard title="Recent" description="Balance changes" image="balance_icon.png" route="/balance"/>
        <InfoCard title="Competitive" description="Ranking system" image="rank_icon.png" route="/competitive" />
      </div>
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
.page {
  position: relative;
  min-height: 50vh;
  padding: 20px;
}
</style>
