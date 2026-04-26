<script setup lang="ts">
// STEP 9 — Category index.
//
// Lists every category returned by /api/categories. Clicking a tile drills
// into /category/:name which lists all recipes in that category.

import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { api, ApiError } from '@/api/client'
import type { Category } from '@/types/recipe'
import Loader from '@/components/Loader.vue'
import ErrorBox from '@/components/ErrorBox.vue'

const categories = ref<Category[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    categories.value = await api.categories()
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : 'Network error — please try again.'
  } finally {
    loading.value = false
  }
}
onMounted(load)
</script>

<template>
  <h1 class="page-title">Browse by category</h1>
  <p class="page-sub">Pick a cuisine or course type to see every dish inside it.</p>

  <Loader v-if="loading" label="Loading categories…" />
  <ErrorBox v-else-if="error" :message="error" :on-retry="load" />

  <div v-else class="grid">
    <RouterLink
      v-for="c in categories"
      :key="c.id"
      :to="{ name: 'category', params: { name: c.name } }"
      class="cat"
    >
      <div class="thumb">
        <img :src="c.thumbnail" :alt="c.name" loading="lazy" referrerpolicy="no-referrer" />
      </div>
      <div class="body">
        <h3>{{ c.name }}</h3>
        <p>{{ c.description.split('. ')[0] }}.</p>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.page-title { margin: 0 0 0.4rem; font-size: clamp(1.6rem, 3vw, 2.2rem); letter-spacing: -0.01em; }
.page-sub { color: var(--muted); margin: 0 0 1.4rem; }
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
.cat {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 160ms ease, border-color 160ms ease;
}
.cat:hover { transform: translateY(-3px); border-color: rgba(236, 72, 153, 0.5); }
.thumb { aspect-ratio: 16 / 9; overflow: hidden; background: #0b1220; }
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.body { padding: 0.9rem 1.1rem 1.1rem; }
.body h3 { margin: 0 0 0.35rem; font-size: 1.05rem; }
.body p { margin: 0; color: var(--muted); font-size: 0.88rem; line-height: 1.5; }
</style>
