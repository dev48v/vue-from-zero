<script setup lang="ts">
// STEP 8 — Recipe detail page.
//
// Hits /api/recipes/{id} for the full payload (instructions + ingredient
// list + youtube + source link). Uses the route param as the cache key so
// in-app navigation between two recipes refetches cleanly.

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { api, ApiError } from '@/api/client'
import type { Recipe } from '@/types/recipe'
import Loader from '@/components/Loader.vue'
import ErrorBox from '@/components/ErrorBox.vue'

const props = defineProps<{ id: string }>()
const router = useRouter()

const recipe = ref<Recipe | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    recipe.value = await api.recipeById(props.id)
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      error.value = `No recipe with id ${props.id}.`
    } else {
      error.value = e instanceof ApiError ? e.message : 'Network error — please try again.'
    }
    recipe.value = null
  } finally {
    loading.value = false
  }
}

watch(() => props.id, load, { immediate: true })
</script>

<template>
  <button class="back" @click="router.back()" aria-label="Go back">← Back</button>

  <Loader v-if="loading" label="Loading recipe…" />
  <ErrorBox v-else-if="error" :message="error" :on-retry="load" />

  <article v-else-if="recipe" class="recipe">
    <header class="head">
      <img :src="recipe.thumbnail" :alt="recipe.name" referrerpolicy="no-referrer" />
      <div class="head-text">
        <h1>{{ recipe.name }}</h1>
        <div class="badges">
          <span class="badge">{{ recipe.category }}</span>
          <span class="badge subtle">{{ recipe.area }}</span>
          <span v-for="tag in (recipe.tags ?? [])" :key="tag" class="badge subtle">#{{ tag }}</span>
        </div>
        <div class="links">
          <a v-if="recipe.source" :href="recipe.source" target="_blank" rel="noopener">Original source ↗</a>
          <a v-if="recipe.youtube" :href="recipe.youtube" target="_blank" rel="noopener">Watch on YouTube ↗</a>
        </div>
      </div>
    </header>

    <section class="grid">
      <div class="ingredients">
        <h2>Ingredients</h2>
        <ul>
          <li v-for="(ing, i) in (recipe.ingredients ?? [])" :key="i">
            <span class="measure">{{ ing.measure }}</span>
            <span class="name">{{ ing.name }}</span>
          </li>
        </ul>
      </div>
      <div class="instructions">
        <h2>Method</h2>
        <p v-for="(para, i) in (recipe.instructions ?? '').split(/\r?\n+/).filter(Boolean)" :key="i">
          {{ para }}
        </p>
      </div>
    </section>
  </article>
</template>

<style scoped>
.back {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  padding: 0.45rem 0.8rem;
  border-radius: 8px;
  margin-bottom: 1.2rem;
  font-size: 0.85rem;
}
.back:hover { color: var(--text); border-color: var(--accent); }
.recipe { display: flex; flex-direction: column; gap: 2rem; }
.head {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 1.6rem;
  align-items: start;
}
.head img {
  width: 320px;
  height: 240px;
  object-fit: cover;
  border-radius: var(--radius);
  border: 1px solid var(--border);
}
.head-text h1 {
  margin: 0 0 0.6rem;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  letter-spacing: -0.01em;
}
.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.9rem;
}
.badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
}
.badge.subtle {
  background: rgba(148, 163, 184, 0.14);
  color: var(--muted);
}
.links { display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.9rem; }
.grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
}
.ingredients ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.ingredients li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.4);
}
.ingredients .measure { color: var(--accent); font-weight: 500; }
.ingredients .name { color: var(--text); }
.instructions h2, .ingredients h2 {
  font-size: 1.05rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--muted);
  margin: 0 0 0.8rem;
}
.instructions p {
  line-height: 1.65;
  margin: 0 0 0.8rem;
  color: var(--text);
}
@media (max-width: 760px) {
  .head { grid-template-columns: 1fr; }
  .head img { width: 100%; height: 220px; }
  .grid { grid-template-columns: 1fr; }
}
</style>
