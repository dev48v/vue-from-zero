<script setup lang="ts">
// STEP 7 — Search page.
//
// Default landing view. The search box keeps its query in the URL via
// vue-router so deep links like /?q=chicken work. Debouncing avoids hitting
// the API on every keystroke.

import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api, ApiError } from '@/api/client'
import type { Recipe } from '@/types/recipe'
import RecipeCard from '@/components/RecipeCard.vue'
import Loader from '@/components/Loader.vue'
import ErrorBox from '@/components/ErrorBox.vue'

const route = useRoute()
const router = useRouter()

// Two refs — `input` is what the user is currently typing, `query` is the
// committed value used to fetch. Splitting them is what enables debounce.
const input = ref<string>(typeof route.query.q === 'string' ? route.query.q : 'chicken')
const query = ref<string>(input.value)

const recipes = ref<Recipe[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const empty = computed(() => !loading.value && !error.value && recipes.value.length === 0)

let debounceHandle: ReturnType<typeof setTimeout> | null = null
watch(input, (next) => {
  if (debounceHandle) clearTimeout(debounceHandle)
  debounceHandle = setTimeout(() => {
    query.value = next.trim()
    // Reflect committed query in URL — preserves /?q=… on refresh & share.
    router.replace({ query: query.value ? { q: query.value } : {} })
  }, 280)
})

async function load() {
  if (!query.value) {
    recipes.value = []
    return
  }
  loading.value = true
  error.value = null
  try {
    recipes.value = await api.searchRecipes(query.value)
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : 'Network error — please try again.'
    recipes.value = []
  } finally {
    loading.value = false
  }
}

watch(query, load, { immediate: false })
onMounted(load)
</script>

<template>
  <section class="hero">
    <h1>What's for dinner?</h1>
    <p class="lede">
      Type any ingredient or dish name. Results stream from the
      <a href="https://laravel-from-zero.onrender.com" target="_blank" rel="noopener">Day 18 Laravel API</a>,
      which proxies and caches TheMealDB.
    </p>
    <div class="search">
      <input
        v-model="input"
        type="search"
        placeholder="e.g. chicken, pasta, curry…"
        aria-label="Search recipes"
        autocomplete="off"
      />
    </div>
  </section>

  <Loader v-if="loading" :label="`Searching for &quot;${query}&quot;…`" />
  <ErrorBox v-else-if="error" :message="error" :on-retry="load" />

  <p v-else-if="empty" class="empty">
    No recipes matched <strong>{{ query || '∅' }}</strong>. Try a broader term.
  </p>

  <div v-else class="grid">
    <RecipeCard v-for="r in recipes" :key="r.id" :recipe="r" />
  </div>
</template>

<style scoped>
.hero {
  margin-bottom: 1.6rem;
}
.hero h1 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  margin: 0 0 0.4rem;
  letter-spacing: -0.01em;
}
.lede {
  color: var(--muted);
  margin: 0 0 1.1rem;
  max-width: 60ch;
}
.search input {
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.6);
  color: var(--text);
  font-size: 1rem;
  outline: none;
  transition: border-color 140ms ease, box-shadow 140ms ease;
}
.search input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.empty {
  color: var(--muted);
  padding: 2rem 0;
}
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}
</style>
