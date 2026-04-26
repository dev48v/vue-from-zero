<script setup lang="ts">
// STEP 10 — Random recipe.
//
// Hits /api/recipes/random and renders a slim teaser. A "spin again" button
// re-runs the fetch so the user can keep flipping through suggestions
// without leaving the page.

import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { api, ApiError } from '@/api/client'
import type { Recipe } from '@/types/recipe'
import Loader from '@/components/Loader.vue'
import ErrorBox from '@/components/ErrorBox.vue'

const recipe = ref<Recipe | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

async function spin() {
  loading.value = true
  error.value = null
  try {
    recipe.value = await api.randomRecipe()
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : 'Network error — please try again.'
    recipe.value = null
  } finally {
    loading.value = false
  }
}
onMounted(spin)
</script>

<template>
  <h1 class="page-title">Pick something for me</h1>
  <p class="page-sub">Tap the spinner whenever you can't decide.</p>

  <button class="spin" :disabled="loading" @click="spin">
    {{ loading ? 'Spinning…' : '🎲  Spin again' }}
  </button>

  <Loader v-if="loading && !recipe" label="Picking a recipe…" />
  <ErrorBox v-else-if="error" :message="error" :on-retry="spin" />

  <article v-else-if="recipe" class="teaser">
    <img :src="recipe.thumbnail" :alt="recipe.name" referrerpolicy="no-referrer" />
    <div class="info">
      <h2>{{ recipe.name }}</h2>
      <div class="badges">
        <span class="badge">{{ recipe.category }}</span>
        <span class="badge subtle">{{ recipe.area }}</span>
      </div>
      <p class="snippet">{{ (recipe.instructions ?? '').slice(0, 220) }}…</p>
      <RouterLink :to="{ name: 'recipe', params: { id: recipe.id } }" class="cta">
        Open full recipe →
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.page-title { margin: 0 0 0.2rem; font-size: clamp(1.6rem, 3vw, 2.2rem); letter-spacing: -0.01em; }
.page-sub { color: var(--muted); margin: 0 0 1.4rem; }
.spin {
  display: inline-block;
  background: var(--accent);
  color: #0f172a;
  border: none;
  padding: 0.65rem 1.1rem;
  border-radius: 999px;
  font-weight: 600;
  margin-bottom: 1.6rem;
  transition: transform 120ms ease, opacity 120ms ease;
}
.spin:disabled { opacity: 0.6; cursor: progress; }
.spin:not(:disabled):hover { transform: translateY(-1px); }
.teaser {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 1.6rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.2rem;
}
.teaser img {
  width: 360px;
  height: 280px;
  object-fit: cover;
  border-radius: 8px;
}
.info h2 { margin: 0 0 0.6rem; }
.badges { display: flex; gap: 0.4rem; margin-bottom: 0.9rem; }
.badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
}
.badge.subtle { background: rgba(148, 163, 184, 0.14); color: var(--muted); }
.snippet { color: var(--muted); line-height: 1.55; margin: 0 0 1rem; }
.cta {
  font-weight: 600;
  text-decoration: none;
  color: var(--accent);
}
.cta:hover { text-decoration: underline; }
@media (max-width: 760px) {
  .teaser { grid-template-columns: 1fr; }
  .teaser img { width: 100%; height: 220px; }
}
</style>
