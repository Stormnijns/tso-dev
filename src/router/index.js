import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/forms',
      name: 'forms',
      component: () => import('../views/FormsView.vue'),
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('../views/LeaderboardView.vue'),
    },
    {
      path: '/competitive',
      name: 'competitive',
      component: () => import('../views/CompetitiveView.vue'),
    },
    {
      path: '/balance',
      name: 'balance',
      component: () => import('../views/BalanceView.vue'),
    },
    {
      path: '/tracker',
      name: 'tracker',
      component: () => import('../views/TrackerView.vue'),
    },
  ],
})

export default router
