<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// Tabs A: sticky horizontal pill bar. Royal Red pill slides to the active tab;
// on narrow screens the bar scrolls and keeps the active tab centred.
const props = defineProps({
  categories: { type: Array, required: true },
  active: { type: String, required: true },
  label: { type: String, required: true },
})
const emit = defineEmits(['select'])

const scroller = ref(null)
const tabs = ref({})
const pill = ref({ x: 0, w: 0 })
const ready = ref(false)

function measure(center = true) {
  const el = tabs.value[props.active]
  if (!el) return
  pill.value = { x: el.offsetLeft, w: el.offsetWidth }
  if (center && scroller.value.scrollWidth > scroller.value.clientWidth) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    scroller.value.scrollTo({
      left: el.offsetLeft - (scroller.value.clientWidth - el.offsetWidth) / 2,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }
}

const onResize = () => measure(false)

onMounted(async () => {
  await document.fonts?.ready
  measure(false)
  await nextTick()
  requestAnimationFrame(() => (ready.value = true))
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => window.removeEventListener('resize', onResize))
watch(() => props.active, () => measure())
</script>

<template>
  <nav class="tabs" :aria-label="label">
    <div ref="scroller" class="tabs__scroller">
      <div class="tabs__track">
        <ul class="tabs__list" role="list">
          <li v-for="c in categories" :key="c.id">
            <a
              :ref="(el) => (tabs[`menu-${c.id}`] = el)"
              :href="`#menu-${c.id}`"
              class="tabs__tab"
              :aria-current="active === `menu-${c.id}` ? 'true' : undefined"
              @click.prevent="emit('select', `menu-${c.id}`)"
            >{{ c.title }}</a>
          </li>
        </ul>
        <span
          class="tabs__pill"
          :class="{ 'is-ready': ready }"
          :style="{ transform: `translateX(${pill.x}px)`, width: `${pill.w}px` }"
          aria-hidden="true"
        />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.tabs {
  position: sticky;
  top: var(--sticky-top);
  z-index: var(--z-sticky);
  height: var(--tabs-h);
  display: flex;
  align-items: center;
  background: var(--bg);
  border-bottom: 1px solid var(--line);
  transition: top var(--dur-base) var(--ease-in-out);
}

.tabs__scroller {
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 var(--gutter), #000 calc(100% - var(--gutter)), transparent);
  mask-image: linear-gradient(90deg, transparent, #000 var(--gutter), #000 calc(100% - var(--gutter)), transparent);
}

.tabs__scroller::-webkit-scrollbar {
  display: none;
}

/* The track is the pill's offsetParent, so tab offsetLeft values line up with the pill */
.tabs__track {
  position: relative;
  width: max-content;
  padding: 6px var(--gutter);
}

.tabs__list {
  display: flex;
  gap: var(--space-1);
  margin: 0;
}

.tabs__tab {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 0 1.125rem;
  border-radius: var(--radius-pill);
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  white-space: nowrap;
  transition: color var(--dur-base) var(--ease-out);
}

@media (hover: hover) {
  .tabs__tab:hover { color: var(--text); }
}

.tabs__tab[aria-current='true'] {
  color: var(--text-on-brand);
}

.tabs__pill {
  position: absolute;
  top: 6px;
  left: 0;
  height: 44px;
  border-radius: var(--radius-pill);
  background: var(--action);
}

.tabs__pill.is-ready {
  transition:
    transform var(--dur-base) var(--ease-in-out),
    width var(--dur-base) var(--ease-in-out);
}

@media (min-width: 1200px) {
  .tabs__scroller {
    -webkit-mask-image: none;
    mask-image: none;
  }

  .tabs__track {
    width: min(100% - 2 * var(--gutter), var(--container));
    margin-inline: auto;
    padding-inline: 0;
  }
}
</style>
