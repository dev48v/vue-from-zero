// STEP 3 — Router.
//
// vue-router maps URLs to view components. We use HTML5 history mode (clean
// URLs without #) and lazy-load every view so the initial bundle stays small
// — Vite produces one chunk per dynamic import.

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'Search · Recipe Finder' },
    },
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: () => import('@/views/RecipeView.vue'),
      props: true,
      meta: { title: 'Recipe · Recipe Finder' },
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/CategoriesView.vue'),
      meta: { title: 'Categories · Recipe Finder' },
    },
    {
      path: '/category/:name',
      name: 'category',
      component: () => import('@/views/CategoryView.vue'),
      props: true,
      meta: { title: 'Category · Recipe Finder' },
    },
    {
      path: '/random',
      name: 'random',
      component: () => import('@/views/RandomView.vue'),
      meta: { title: 'Random · Recipe Finder' },
    },
    {
      // Catch-all — anything unrecognised falls back to the search page so
      // shared deep links never produce a hard 404 in the SPA.
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' },
    },
  ],
  scrollBehavior() {
    // Always scroll to top on navigation; keeps long detail pages from
    // landing the user mid-page after clicking a card.
    return { top: 0 }
  },
})

// Tiny title manager — keeps the document title in sync with the route meta.
router.afterEach((to) => {
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title
  }
})

export default router
