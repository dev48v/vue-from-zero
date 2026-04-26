<script setup lang="ts">
// STEP 5 — Error surface.
//
// Reusable error banner. Pages pass in a message (typically the
// ApiError.message thrown by the client) plus an optional retry handler.

defineProps<{
  message: string
  onRetry?: () => void
}>()
</script>

<template>
  <div class="error-box" role="alert">
    <div class="error-title">Something went wrong</div>
    <p class="error-message">{{ message }}</p>
    <button v-if="onRetry" class="retry" @click="onRetry">Try again</button>
  </div>
</template>

<style scoped>
.error-box {
  border: 1px solid rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.08);
  border-radius: var(--radius);
  padding: 1rem 1.2rem;
  color: #fecaca;
}
.error-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.error-message {
  margin: 0 0 0.75rem;
  color: #fca5a5;
}
.retry {
  background: transparent;
  border: 1px solid rgba(239, 68, 68, 0.5);
  color: #fecaca;
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
}
.retry:hover { background: rgba(239, 68, 68, 0.16); }
</style>
