<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/forms">Forms</RouterLink>
    <RouterLink to="/tracker">Tracker</RouterLink>
  </nav>

  <main class="page">
    <RouterView />
  </main>
</template>

<style scoped>
.page {
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
