<script setup lang="ts">
// STEP 9 — Single-category recipe list.
//
// Identical fetch pattern to HomeView but using the /api/categories/:name/recipes
// endpoint. Reusing RecipeCard keeps the visual parity between search and
// browse experiences.

import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { api, ApiError } from '@/api/client'
import type { Recipe } from '@/types/recipe'
import RecipeCard from '@/components/RecipeCard.vue'
import Loader from '@/components/Loader.vue'
import ErrorBox from '@/components/ErrorBox.vue'

const props = defineProps<{ name: string }>()

const recipes = ref<Recipe[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    recipes.value = await api.recipesByCategory(props.name)
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : 'Network error — please try again.'
    recipes.value = []
  } finally {
    loading.value = false
  }
}
watch(() => props.name, load, { immediate: true })
</script>

<template>
  <RouterLink to="/categories" class="back-link">← All categories</RouterLink>
  <h1 class="page-title">{{ name }}</h1>
  <p class="page-sub">{{ recipes.length }} recipe{{ recipes.length === 1 ? '' : 's' }}</p>

  <Loader v-if="loading" :label="`Loading ${name}…`" />
  <ErrorBox v-else-if="error" :message="error" :on-retry="load" />

  <div v-else class="grid">
    <RecipeCard v-for="r in recipes" :key="r.id" :recipe="r" />
  </div>
</template>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 0.8rem;
  font-size: 0.85rem;
  color: var(--muted);
  text-decoration: none;
}
.back-link:hover { color: var(--accent); }
.page-title { margin: 0 0 0.2rem; font-size: clamp(1.6rem, 3vw, 2.2rem); letter-spacing: -0.01em; }
.page-sub { color: var(--muted); margin: 0 0 1.4rem; }
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}
</style>
