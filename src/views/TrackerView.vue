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

const searchId = ref('')
const userId = ref('36449401')

async function loadPlayerData(id: string) {
  try {
    loading.value = true
    error.value = ''

    const [dataRes, userRes, groupRes] = await Promise.all([
      fetch(`https://tso-dev-backend.onrender.com/api/player/${id}`),
      fetch(`https://tso-dev-backend.onrender.com/api/user/${id}`),
      fetch(`https://tso-dev-backend.onrender.com/api/group/${id}`),
    ])

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
const saberDuelingKills = computed(() => data.value?.[2]?.data?.value?.Data?.Kills)
const saberDuelingDeaths = computed(() => data.value?.[2]?.data?.value?.Data?.Deaths)
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
      <h1>
        {{ username }} ({{ displayName }})
        <span id="rank">{{ groupRank }}</span>
      </h1>

      <p>ID: {{ userId }}</p>

      <h2>Saber Dueling</h2>
      <p>Kills: {{ saberDuelingKills }}</p>
      <p>Deaths: {{ saberDuelingDeaths }}</p>

      <pre v-if="false">{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
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
</style>
