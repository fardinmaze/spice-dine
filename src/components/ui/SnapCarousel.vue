<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'

// Native scroll-snap slider. Swipe works without JS; arrows step one card and disable at each end.
const props = defineProps({
  items: { type: Array, required: true },
  label: { type: String, required: true },
  itemWidth: { type: String, default: 'clamp(15rem, 70vw, 20rem)' },
})

const track = ref(null)
const atStart = ref(true)
const atEnd = ref(false)

function update() {
  const el = track.value
  if (!el) return
  atStart.value = el.scrollLeft <= 4
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
}

function step(dir) {
  const el = track.value
  const card = el.querySelector('li')
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduced ? 'auto' : 'smooth' })
}

onMounted(() => {
  update()
  window.addEventListener('resize', update)
})
onBeforeUnmount(() => window.removeEventListener('resize', update))
</script>

<template>
  <div class="carousel" role="region" :aria-label="label">
    <div class="carousel__controls">
      <div class="carousel__header"><slot name="header" /></div>
      <button type="button" class="carousel__arrow" :disabled="atStart" @click="step(-1)">
        <AppIcon name="chevron-left" :size="22" />
        <span class="visually-hidden">Previous</span>
      </button>
      <button type="button" class="carousel__arrow" :disabled="atEnd" @click="step(1)">
        <AppIcon name="chevron-right" :size="22" />
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <ul ref="track" class="carousel__track" role="list" :style="{ '--item-w': itemWidth }" @scroll.passive="update">
      <li v-for="(item, i) in props.items" :key="i" class="carousel__item">
        <slot :item="item" :index="i" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.carousel {
  display: grid;
  gap: var(--space-6);
}

.carousel__controls {
  display: flex;
  align-items: flex-end;
  gap: var(--space-2);
}

.carousel__header {
  flex: 1;
  margin-right: var(--space-4);
}

.carousel__arrow {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1.5px solid var(--action);
  border-radius: 50%;
  background: transparent;
  color: var(--action);
  cursor: pointer;
  transition:
    background-color var(--dur-base) var(--ease-out),
    color var(--dur-base) var(--ease-out),
    opacity var(--dur-base) var(--ease-out);
}

@media (hover: hover) {
  .carousel__arrow:not(:disabled):hover {
    background: var(--action);
    color: var(--text-on-brand);
  }
}

.carousel__arrow:active:not(:disabled) {
  transform: scale(0.95);
}

.carousel__arrow:disabled {
  opacity: 0.3;
  cursor: default;
}

.carousel__track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: var(--item-w);
  gap: var(--space-4);
  margin: 0;
  padding: 4px 4px var(--space-4);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 4px;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
}

.carousel__item {
  scroll-snap-align: start;
}
</style>
