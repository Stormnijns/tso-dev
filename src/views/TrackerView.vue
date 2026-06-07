<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const error = ref('')
const data = ref<any>(null)
const userInfo = ref<any>(null)
const groupInfo = ref<any>(null)
const avatarUrl = ref('')
const searchId = ref('')
const userId = ref('36449401')

async function loadPlayerData(id: string) {
  try {
    loading.value = true
    error.value = ''

    const [dataRes, userRes, groupRes, avatarRes] = await Promise.all([
      fetch(`https://tso-dev-backend.onrender.com/api/player/${id}`),
      fetch(`https://tso-dev-backend.onrender.com/api/user/${id}`),
      fetch(`https://tso-dev-backend.onrender.com/api/group/${id}`),
      fetch(`https://tso-dev-backend.onrender.com/api/avatar/${id}`),
    ])

    const avatar = await avatarRes.json()
    avatarUrl.value = avatar?.imageUrl ?? ''

    data.value = await dataRes.json()
    userInfo.value = await userRes.json()
    groupInfo.value = await groupRes.json()
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const queryId = route.query.user as string

  if (queryId) {
    userId.value = queryId
    searchId.value = queryId
  }

  loadPlayerData(userId.value)
})
function formatTime(seconds: number | null | undefined) {
  if (!seconds || seconds <= 0) return '0m'

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }

  return `${minutes}m`
}
function search() {
  if (!searchId.value) return

  userId.value = searchId.value

  router.push({
    path: '/tracker',
    query: { user: userId.value }
  })

  loadPlayerData(userId.value)
}

const equippedSaber = computed(() => data.value?.[0]?.data?.value?.Data?.EquippedSaber)

const saberDueling = {
  Kills: computed(() => data.value?.[2]?.data?.value?.Data?.Kills),
  Deaths: computed(() => data.value?.[2]?.data?.value?.Data?.Deaths),
  Wins: computed(() => data.value?.[2]?.data?.value?.Data?.Wins),
  Losses: computed(() => data.value?.[2]?.data?.value?.Data?.Losses ?? 0),
  Level: computed(() => data.value?.[2]?.data?.value?.Data?.Level ?? 0),
}

const saberArena = {
  Kills: computed(() => data.value?.[1]?.data?.value?.Data?.AllTime?.Kills),
  Deaths: computed(() => data.value?.[1]?.data?.value?.Data?.AllTime?.Deaths),
  Wins: computed(() => data.value?.[1]?.data?.value?.Data?.AllTime?.Wins),
  Losses: computed(() => data.value?.[1]?.data?.value?.Data?.AllTime?.Losses),
  TimePlayed: computed(() => data.value?.[1]?.data?.value?.Data?.TimePlayed),
}

const username = computed(() => userInfo.value?.name)
const displayName = computed(() => userInfo.value?.displayName)
const groupRank = computed(() => groupInfo.value?.role?.name ?? 'Not in group')

</script>

<template>
  <main>
    <div class="search">
      <input v-model="searchId" placeholder="Enter Roblox User ID" @keyup.enter="search" />
      <button @click="search">Search</button>
    </div>

    <p v-if="loading">Loading...</p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <div v-else>
      <div v-if="username !== undefined" class="profile-header">
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          alt="Avatar"
          class="avatar"
        />

        <div>
          <h1>
            {{ username }} ({{ displayName }})
            <span id="rank">{{ groupRank }}</span>
          </h1>

          <p>ID: {{ userId }}</p>
        </div>
      </div>
      <h1 v-if="username === undefined">User not found!</h1>

      <br>
      <div v-if="username !== undefined">
        <h2>Saber Dueling (Lv.{{saberDueling.Level}})</h2>
        <p v-if="saberDueling.Kills.value === undefined">User hasn't joined ever, or since tracking started.</p>
        <div class="stats-grid" v-if="saberDueling.Kills.value !== undefined">
          <p>Kills<br><span>{{ saberDueling.Kills }}</span></p>
          <p>Deaths<br><span>{{ saberDueling.Deaths }}</span></p>
          <p>Wins<br><span>{{ saberDueling.Wins }}</span></p>
          <p>Losses<br><span>{{ saberDueling.Losses }}</span></p>
        </div>
        <br>

        <h2>Saber Arena (Played for {{formatTime(saberArena.TimePlayed.value)}})</h2>
        <p v-if="saberArena.TimePlayed.value === undefined">User hasn't joined ever, or since tracking started.</p>
        <div class="stats-grid" v-if="saberArena.TimePlayed.value !== undefined">
          <p>Kills<br><span>{{ saberArena.Kills }}</span></p>
          <p>Deaths<br><span>{{ saberArena.Deaths }}</span></p>
          <p>Wins<br><span>{{ saberArena.Wins }}</span></p>
          <p>Losses<br><span>{{ saberArena.Losses }}</span></p>
        </div>
      </div>

      <pre v-if="false">{{ JSON.stringify(data, null, 2) }}</pre>
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

#rank {
  border: dodgerblue 1px solid;
  width: fit-content;
  padding: 0 10px;
  border-radius: 10px;
}

.search {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  border: #232630 1px solid;
  border-radius: 12px;
  padding: 4px;
  background: #181a21;
}

.stats-grid p {
  border-radius: 6px;
  padding: 2px 4px;
  background: #333640;
  color: #acb3bf;
}
.stats-grid p span {
  color: white;
}

input {
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  outline: none;
  background: rgba(255, 255, 255, 0.05);
  color: inherit;
  width: 220px;
  transition: all 0.2s ease;
}

input:focus {
  border-color: dodgerblue;
  box-shadow: 0 0 0 3px rgba(30, 144, 255, 0.25);
}

button {
  padding: 10px 16px;
  border-radius: 999px;
  border: none;
  background: dodgerblue;
  color: white;
  cursor: pointer;
  transition: 0.2s ease;
  font-weight: 500;
}

button:hover {
  background: #1b82ff;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0px);
}
.profile-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #232630;
}

</style>
