# vue-from-zero

> Day 22 of the **TechFromZero** series — Vue 3 + Vite + TypeScript Recipe Finder consuming the Day 18 Laravel API.

A working SPA you can clone and learn from. Every commit is one concept, every file is one lesson, and every line is commented for clarity.

- **Live demo:** [vue-from-zero.vercel.app](https://vue-from-zero.vercel.app)
- **API it consumes:** [laravel-from-zero.onrender.com](https://laravel-from-zero.onrender.com) (Day 18, TheMealDB proxy)
- **Stack:** Vue 3.5, Vite 5, TypeScript 5.6, vue-router 4, plain CSS (no UI kit)

---

## Quick start

```bash
git clone https://github.com/dev48v/vue-from-zero.git
cd vue-from-zero
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

The app talks to the Day 18 Laravel API at `https://laravel-from-zero.onrender.com` by default. To point it elsewhere, copy `.env.example` to `.env.local` and edit `VITE_API_BASE`.

```bash
npm run build      # type-check with vue-tsc + bundle to dist/
npm run preview    # preview the production build locally
```

---

## What's inside

```
vue-from-zero/
├─ index.html              # single mount point — Vite injects /src/main.ts
├─ src/
│  ├─ main.ts              # createApp(App).use(router).mount('#app')
│  ├─ App.vue              # layout shell — header, nav, <RouterView>, footer
│  ├─ router/index.ts      # vue-router 4 — five lazy-loaded routes
│  ├─ api/client.ts        # fetch wrapper, ApiError class, envelope unwrap
│  ├─ types/recipe.ts      # Recipe / Ingredient / Category interfaces
│  ├─ components/
│  │  ├─ RecipeCard.vue    # reusable card used in three views
│  │  ├─ Loader.vue        # animated dots
│  │  └─ ErrorBox.vue      # red banner with optional retry
│  ├─ views/
│  │  ├─ HomeView.vue      # search box + grid (debounced, URL-synced)
│  │  ├─ RecipeView.vue    # detail page — ingredients + method
│  │  ├─ CategoriesView.vue
│  │  ├─ CategoryView.vue
│  │  └─ RandomView.vue    # spin-the-wheel
│  └─ assets/main.css      # CSS custom properties + base styles
├─ vite.config.ts          # plugin-vue + dev-server port pin
├─ tsconfig*.json          # split refs config (DOM + node)
└─ vercel.json             # SPA rewrite so deep links resolve
```

---

## Step-by-step guide

If you're learning Vue, read the commit history top-to-bottom — each commit introduces one concept.

### Step 1 — Project skeleton

`package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.ts`, `src/App.vue` (placeholder), `src/assets/main.css`.

You learn: how Vite serves a Vue project; what a single-file component (`.vue`) looks like; how `createApp(...).mount('#app')` wires markup to the DOM.

### Step 2 — Types + API client

`src/types/recipe.ts` defines the JSON shapes. `src/api/client.ts` wraps `fetch` once so every page gets the same error class, the same base URL, and the same `{ data: ... }` envelope unwrap.

You learn: TypeScript generics for response envelopes; centralising error handling; reading `import.meta.env` for build-time configuration.

### Step 3 — Router

`src/router/index.ts` registers five routes with `createRouter` + `createWebHistory`. Each view is a dynamic `import()` so Vite produces a separate bundle per route — your initial JS payload stays small.

You learn: HTML5 history mode vs hash mode; route params; lazy-loading; `meta.title` + `afterEach` for document titles.

### Step 4 — Layout shell (App.vue)

The persistent header, nav links, `<RouterView>` slot, and footer. A `<transition>` wrapper gives a 160 ms fade between routes.

You learn: `<RouterLink>` vs `<a>`; how `router-link-active` styling works; transitions on async components.

### Step 5 — Reusable building blocks

`Loader.vue` and `ErrorBox.vue`. Every async view uses these so loading and error states look identical.

You learn: `defineProps` with TypeScript generics; scoped styles; props-as-callbacks (`onRetry`).

### Step 6 — Recipe card

`RecipeCard.vue` is consumed by three different views. It's the canonical example of a presentational component — props in, no state, no fetching.

### Step 7 — Search page

`HomeView.vue` debounces the input by 280 ms, syncs the committed query to the URL via `router.replace`, and refetches whenever it changes. `watch` does the heavy lifting.

You learn: `ref` + `computed` + `watch`; debounce with `setTimeout`; reading and writing route query params without a full navigation.

### Step 8 — Recipe detail

`RecipeView.vue` reads the `:id` route param and refetches whenever it changes. It splits instructions on newlines into paragraphs and renders ingredient quantities alongside names.

### Step 9 — Categories

`CategoriesView.vue` lists all categories and links to a per-category view. `CategoryView.vue` reuses `RecipeCard` so the visual language stays consistent with search results.

### Step 10 — Random recipe

`RandomView.vue` adds a "spin again" button that re-runs the fetch — a quick demo of triggering work from a UI event rather than a route change.

### Step 11 — Polish

Empty states, hover transitions on cards, focus rings on the search input, mobile media queries on detail and random views, sticky header.

### Step 12 — Build + deploy

`vercel.json` rewrites all routes to `/index.html` so vue-router's HTML5 mode works on a static host. `npm run build` runs `vue-tsc` (type check) and `vite build` (bundle).

---

## Why these choices?

- **No Pinia, no Vuex** — five views, no shared state worth lifting. Component-local refs are simpler and you'll learn `<script setup>` more deeply without the indirection.
- **Plain CSS, no Tailwind** — every selector in the file you're reading. Future-you can change it without learning a config-driven utility system first.
- **Lazy routes** — even a five-page app benefits. The first paint loads only `HomeView`, the rest stream on demand.
- **One API client, one error class** — every async failure gets the same shape, so views never re-implement error handling.

## Series

This is **Day 22** of a 50-day TechFromZero series. See all days at [dev48v.infy.uk/techfromzero.php](https://dev48v.infy.uk/techfromzero.php).
