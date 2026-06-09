<script setup lang="ts">
import Banner from '@/components/PageBanner.vue'
import RankCard from '@/components/RankCard.vue'
</script>

<template>
  <main class="page">
    <Banner image="background1.png"/>
    <div class="content">
      <div id="rank-list">
        <RankCard rank="unranked"/>
        <RankCard rank="bronze"/>
        <RankCard rank="silver"/>
        <RankCard rank="gold"/>
        <RankCard rank="platinum"/>
        <RankCard rank="emerald"/>
        <RankCard rank="diamond"/>
        <RankCard rank="master"/>
      </div>
    </div>
  </main>
</template>

<style scoped>
.content img {
  height: 100px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#rank-list {
  background: #181a21;
  border-radius: 10px;
  padding: 1rem;
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem;
}
</style>
