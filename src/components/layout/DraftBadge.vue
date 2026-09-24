<script setup>
import { ref } from 'vue'
import AppIcon from '../ui/AppIcon.vue'
import { copy } from '../../data/copy'

const enabled = import.meta.env.VITE_SHOW_DRAFT_BADGE === 'true'
const visible = ref(enabled)
</script>

<template>
  <div v-if="visible" class="draft" role="status">
    <span>{{ copy.draftBadge }}</span>
    <button type="button" class="draft__close" @click="visible = false">
      <AppIcon name="close" :size="16" />
      <span class="visually-hidden">Dismiss draft notice</span>
    </button>
  </div>
</template>

<style scoped>
.draft {
  position: fixed;
  left: var(--space-3);
  bottom: var(--space-3);
  z-index: calc(var(--z-actionbar) + 1);
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: 0.25rem 0.25rem 0.25rem 0.875rem;
  border-radius: var(--radius-pill);
  background: var(--c-ink);
  color: var(--c-white);
  font-size: 0.8125rem;
  font-weight: 600;
  box-shadow: var(--shadow-soft);
  --focus-ring: var(--c-white);
}

.draft__close {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

@media (max-width: 809px) {
  .draft { bottom: calc(88px + env(safe-area-inset-bottom)); }
}
</style>
