/// <reference types="vite/client" />

// Tell TypeScript what each VITE_ env variable looks like. The Recipe Finder
// only needs one knob — the API base URL — so the rest stays untouched.
interface ImportMetaEnv {
  readonly VITE_API_BASE: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
