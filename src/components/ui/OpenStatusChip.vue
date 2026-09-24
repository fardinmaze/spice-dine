<script setup>
import { useOpenStatus } from '../../composables/useOpenStatus'

defineProps({ tone: { type: String, default: 'light' } }) // 'light' | 'on-brand'
const { status } = useOpenStatus()
</script>

<template>
  <p class="chip" :class="[`chip--${status.state}`, `chip--${tone}`]">
    <span class="chip__dot" aria-hidden="true" />
    {{ status.label }}
  </p>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.375rem 0.875rem 0.375rem 0.75rem;
  border-radius: var(--radius-pill);
  background: var(--surface);
  border: 1px solid var(--line);
  font-size: var(--fs-small);
  font-weight: 600;
}

.chip--on-brand {
  background: rgb(255 255 255 / 0.12);
  border-color: rgb(255 255 255 / 0.25);
  color: var(--c-white);
}

.chip__dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--leaf);
}

.chip--on-brand.chip--open .chip__dot { background: #7fd08c; }
.chip--closing-soon .chip__dot { background: var(--highlight); }
.chip--closed .chip__dot { background: var(--c-royal); }
.chip--on-brand.chip--closed .chip__dot { background: var(--c-white); }

/* Open: pulse once on load */
.chip--open .chip__dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: inherit;
  animation: pulse 1.4s var(--ease-out) 600ms 1 both;
}

@keyframes pulse {
  from { transform: scale(1); opacity: 0.7; }
  to { transform: scale(3); opacity: 0; }
}
</style>
