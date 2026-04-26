<script setup lang="ts">
// STEP 6 — Recipe card.
//
// Used in three places: search results, category listing, and the related
// recipes section on the detail page. Centralising the look here means a
// design tweak only needs to happen once.

import { RouterLink } from 'vue-router'
import type { Recipe } from '@/types/recipe'

defineProps<{ recipe: Recipe }>()
</script>

<template>
  <RouterLink :to="{ name: 'recipe', params: { id: recipe.id } }" class="card">
    <div class="thumb-wrap">
      <img
        :src="recipe.thumbnail"
        :alt="recipe.name"
        loading="lazy"
        referrerpolicy="no-referrer"
      />
    </div>
    <div class="body">
      <h3 class="title">{{ recipe.name }}</h3>
      <div class="meta">
        <span class="pill">{{ recipe.category }}</span>
        <span class="pill subtle">{{ recipe.area }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}
.card:hover {
  transform: translateY(-3px);
  border-color: rgba(236, 72, 153, 0.5);
  box-shadow: var(--shadow);
}
.thumb-wrap {
  aspect-ratio: 4 / 3;
  background: #0b1220;
  overflow: hidden;
}
.thumb-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 240ms ease;
}
.card:hover .thumb-wrap img { transform: scale(1.04); }
.body {
  padding: 0.9rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
.title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.005em;
  line-height: 1.25;
}
.meta {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.pill {
  font-size: 0.72rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
}
.pill.subtle {
  background: rgba(148, 163, 184, 0.12);
  color: var(--muted);
}
</style>
