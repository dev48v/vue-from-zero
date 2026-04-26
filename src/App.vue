<script setup lang="ts">
// STEP 4 — Layout shell.
//
// App.vue is the outer frame every page lives inside. It renders the top
// nav (links handled by vue-router) and a <RouterView> slot where the active
// page mounts. The <transition> wrapper gives a tiny fade between routes so
// navigation feels deliberate rather than abrupt.

import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <RouterLink to="/" class="brand">
        <span class="brand-mark">▲</span>
        <span class="brand-text">Recipe Finder</span>
        <span class="brand-tag">Vue From Zero</span>
      </RouterLink>
      <nav class="nav">
        <RouterLink to="/">Search</RouterLink>
        <RouterLink to="/categories">Categories</RouterLink>
        <RouterLink to="/random">Random</RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <RouterView v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </RouterView>
    </main>

    <footer class="app-footer">
      <span>Day 22 · TechFromZero · built on Vue 3 + Vite</span>
      <a href="https://laravel-from-zero.onrender.com/api/health" target="_blank" rel="noopener">API health</a>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.1rem 2rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 10;
}
.brand {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  text-decoration: none;
  color: inherit;
}
.brand-mark {
  font-size: 1.4rem;
  color: var(--accent);
}
.brand-text {
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
}
.brand-tag {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--muted);
}
.nav {
  display: flex;
  gap: 0.4rem;
}
.nav a {
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--muted);
  font-size: 0.92rem;
  transition: background 120ms ease, color 120ms ease;
}
.nav a:hover {
  color: var(--text);
  background: rgba(148, 163, 184, 0.08);
}
.nav a.router-link-active {
  color: var(--accent);
  background: rgba(236, 72, 153, 0.1);
}
.app-main {
  flex: 1;
  width: min(1100px, 100% - 2rem);
  margin: 0 auto;
  padding: 2rem 0 4rem;
}
.app-footer {
  border-top: 1px solid rgba(148, 163, 184, 0.18);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--muted);
}
.app-footer a {
  color: var(--muted);
}
.app-footer a:hover {
  color: var(--accent);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 160ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 600px) {
  .app-header {
    flex-direction: column;
    gap: 0.7rem;
    padding: 1rem;
  }
  .brand-tag { display: none; }
}
</style>
