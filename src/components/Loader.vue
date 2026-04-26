<script setup lang="ts">
// STEP 5 — Tiny loading indicator.
//
// Used by every async view. Keeps the markup the same everywhere so a
// loading recipe page looks like a loading category page.
defineProps<{ label?: string }>()
</script>

<template>
  <div class="loader" role="status">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="loader-text">{{ label ?? 'Loading…' }}</span>
  </div>
</template>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 0;
  color: var(--muted);
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.4;
  animation: bounce 0.9s infinite ease-in-out;
}
.dot:nth-child(2) { animation-delay: 0.15s; }
.dot:nth-child(3) { animation-delay: 0.3s; }
.loader-text {
  margin-left: 0.4rem;
  font-size: 0.92rem;
}
@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-4px); opacity: 1; }
}
</style>
