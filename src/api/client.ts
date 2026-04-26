// STEP 2 — API client.
//
// Thin wrapper around fetch() so every page in the app talks to the Day 18
// Laravel API the same way: same base URL, same error handling, same JSON
// envelope unwrap. Components stay free of fetch boilerplate.

import type {
  ApiEnvelope,
  Category,
  Recipe,
} from '@/types/recipe'

// VITE_API_BASE is wired up in .env.* files and on Vercel. Fallback to the
// public Render URL so `npm run dev` works for any contributor without setup.
const BASE = (import.meta.env.VITE_API_BASE ?? 'https://laravel-from-zero.onrender.com').replace(/\/$/, '')

class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  // Laravel returns problem details as JSON for 4xx/5xx — surface the message
  // so the UI can render something meaningful instead of "Failed to fetch".
  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`
    try {
      const body = (await res.json()) as { message?: string }
      if (body?.message) message = body.message
    } catch {
      /* response wasn't JSON — keep the status text */
    }
    throw new ApiError(message, res.status)
  }

  return (await res.json()) as T
}

// Each helper unwraps the { data: ... } envelope so callers receive the
// payload they actually care about.
export const api = {
  searchRecipes(query: string): Promise<Recipe[]> {
    const q = encodeURIComponent(query.trim())
    return request<ApiEnvelope<Recipe[]>>(`/api/recipes/search?q=${q}`).then((r) => r.data)
  },

  randomRecipe(): Promise<Recipe> {
    return request<ApiEnvelope<Recipe>>(`/api/recipes/random`).then((r) => r.data)
  },

  recipeById(id: number | string): Promise<Recipe> {
    return request<ApiEnvelope<Recipe>>(`/api/recipes/${id}`).then((r) => r.data)
  },

  categories(): Promise<Category[]> {
    return request<ApiEnvelope<Category[]>>(`/api/categories`).then((r) => r.data)
  },

  recipesByCategory(category: string): Promise<Recipe[]> {
    const c = encodeURIComponent(category)
    return request<ApiEnvelope<Recipe[]>>(`/api/categories/${c}/recipes`).then((r) => r.data)
  },
}

export { ApiError }
export const API_BASE = BASE
