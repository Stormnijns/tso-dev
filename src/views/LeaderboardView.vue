<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Banner from '@/components/PageBanner.vue'
import LeaderboardEntry from '@/components/LeaderboardEntry.vue'

const leaderboard = ref<any[]>([])
const loading = ref(false)
const error = ref('')

async function getLeaderboard() {
  loading.value = true
  error.value = ''

  try {
    const res = await fetch('https://tso-dev-backend.onrender.com/api/leaderboard')

    const json = await res.json()

    leaderboard.value = Array.isArray(json.leaderboard) ? json.leaderboard : []
  } catch (err: any) {
    error.value = err.message
    leaderboard.value = []
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  getLeaderboard()
})
</script>

<template>
  <main class="page">
    <Banner image="backgroundLb.png" />

    <div class="content">
      <div id="leaderboard">
        <p v-if="loading">Loading...</p>
        <p v-else-if="error" style="color: red">{{ error }}</p>

        <LeaderboardEntry
          v-for="(player, index) in leaderboard"
          :key="player.userId"
          :rank="index + 1"
          :user-id="player.userId"
          :name="player.username ?? 'Unknown'"
          :value="player.kills ?? 0"
          :avatar="player.avatar ?? ''"
        />
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
