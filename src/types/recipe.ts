// STEP 2 — Domain types.
//
// One source of truth for the JSON shapes coming back from the Day 18
// Laravel API. The Laravel layer normalises TheMealDB into these structures,
// so the frontend never has to reach into raw `strMeal` / `strInstructions`
// / `strIngredient1`-`strIngredient20` columns.

export interface Recipe {
  id: number
  name: string
  category: string
  area: string
  thumbnail: string
  // Some endpoints return only the summary fields; the rest are populated on
  // the detail endpoint. Marking them optional keeps both shapes typed.
  instructions?: string
  ingredients?: Ingredient[]
  source?: string | null
  youtube?: string | null
  tags?: string[]
}

export interface Ingredient {
  name: string
  measure: string
}

export interface Category {
  id: number
  name: string
  thumbnail: string
  description: string
}

// Generic envelope — Laravel wraps list responses in { data: [...] } and
// detail responses in { data: {...} }. Typing the envelope once avoids
// re-declaring it in every fetch call.
export interface ApiEnvelope<T> {
  data: T
}
