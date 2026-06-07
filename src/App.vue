<script setup>
import { RouterLink, RouterView } from 'vue-router'
const version = __COMMIT_HASH__
</script>

<template>
  <div class="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/leaderboard">Leaderboard</RouterLink>
      <RouterLink to="/tracker">Tracker</RouterLink>
    </nav>

    <main class="page">
      <RouterView />
    </main>

    <footer>
      <div class="footer-left">
        <p>© 2026 TSO Tracker</p>
        <p class="footer-subtitle">Community statistics and player tracking</p>
      </div>
      <div>
        <a href="https://discord.gg/tso">Community Discord</a>
        <a href="https://www.roblox.com/communities/3423188/h-S-th-Ord-r">Roblox Group</a>
      </div>
      <div class="footer-right">
        <p>v.{{ version }}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.footer-left {
  flex: 0 0 auto;
  text-align: left;
}

.footer-right {
  flex: 0 0 auto;
  text-align: right;
  align-self: flex-end;
  color: #5f5f6a;
}

footer > div:nth-child(2) {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  padding: 0 5rem;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.page {
  flex: 1;
  padding-top: 40px;
  width: 100%;
}

nav {
  width: 100%;
  font-size: 20px;
  text-align: left;
  position: fixed;
  top: 0;
  left: 0;
}

footer {
  padding: 10px;
  border-top: 1px solid #232630;
  background: #181a21;

  display: flex;
  align-items: center;
}
footer a {
  margin: 0 1rem;
}

footer p {
  font-size: 0.9rem;
  margin: 0;
}

.footer-subtitle {
  font-size: 0.7rem;
  color: #acb3bf;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
