<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '../ui/BaseButton.vue'
import { site } from '../../config/site'
import { copy } from '../../data/copy'
import { useCart } from '../../composables/useCart'
import { openOverlay } from '../../composables/useOverlays'

// Phones and small tablets. Appears once the page hero ([data-actionbar-show-after]) has scrolled past,
// hides while any [data-actionbar-hide] element (Visit section, footer) is in view.
const route = useRoute()
const pastHero = ref(false)
const hiding = reactive(new Set())
const visible = computed(() => pastHero.value && hiding.size === 0)

// Once something is in the cart, the main action becomes "View cart"
const { count } = useCart()

let heroObserver
let hideObserver

function observe() {
  heroObserver?.disconnect()
  hideObserver?.disconnect()
  hiding.clear()
  pastHero.value = false

  const hero = document.querySelector('[data-actionbar-show-after]')
  heroObserver = new IntersectionObserver(([entry]) => {
    pastHero.value = !entry.isIntersecting && entry.boundingClientRect.bottom < 0
  })
  if (hero) heroObserver.observe(hero)

  hideObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) hiding.add(entry.target)
      else hiding.delete(entry.target)
    }
  })
  document.querySelectorAll('[data-actionbar-hide]').forEach((el) => hideObserver.observe(el))
}

onMounted(() => setTimeout(observe, 50))
// Re-scan after the route fade has swapped the page in
watch(() => route.path, () => nextTick(() => setTimeout(observe, 320)))
onBeforeUnmount(() => {
  heroObserver?.disconnect()
  hideObserver?.disconnect()
})
</script>

<template>
  <div class="action-bar" :class="{ 'is-visible': visible }" :inert="!visible || undefined">
    <BaseButton v-if="count" :label="`${copy.cart.view} (${count})`" icon="bag" block @click="openOverlay('cart')" />
    <BaseButton v-else :label="copy.cta.order" :href="site.orderUrl" external block />
    <BaseButton :label="copy.cta.call" :href="site.phoneHref" icon="phone" variant="secondary" block class="action-bar__call" />
  </div>
</template>

<style scoped>
.action-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--z-actionbar);
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--space-2);
  padding: var(--space-3) var(--gutter) calc(var(--space-3) + env(safe-area-inset-bottom));
  background: color-mix(in srgb, var(--bg) 94%, transparent);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--line);
  transform: translateY(110%);
  transition: transform 320ms var(--ease-out);
}

.action-bar.is-visible {
  transform: none;
}

.action-bar__call {
  --btn-bg: var(--surface);
}

@media (min-width: 810px) {
  .action-bar { display: none; }
}
</style>
