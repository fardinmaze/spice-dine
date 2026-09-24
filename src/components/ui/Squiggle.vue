<script setup>
// Hand-drawn turmeric squiggle. Draws in once (900ms) when `play` becomes true.
defineProps({
  play: { type: Boolean, default: true },
  width: { type: Number, default: 180 },
})
</script>

<template>
  <svg class="squiggle" :class="{ 'is-playing': play }" :width="width" viewBox="0 0 180 18" fill="none" aria-hidden="true">
    <path
      d="M3 11c9-7 16-7 22 0s13 7 21 0 14-7 21 0 13 7 21 0 14-7 21 0 13 7 21 0 14-7 21 0 13 7 21 0"
      pathLength="1"
      stroke="currentColor"
      stroke-width="4"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped>
.squiggle {
  display: block;
  height: auto;
  color: var(--highlight);
}

.squiggle path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}

.squiggle.is-playing path {
  animation: draw 900ms var(--ease-out) forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .squiggle path { stroke-dashoffset: 0; }
}
</style>
