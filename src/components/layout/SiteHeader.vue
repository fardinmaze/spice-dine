<script setup>
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '../ui/BaseButton.vue'
import AppIcon from '../ui/AppIcon.vue'
import { nav, site } from '../../config/site'
import { copy } from '../../data/copy'
import { useHeaderState } from '../../composables/useHeaderState'

const route = useRoute()
const { scrolled, hidden, setPinned } = useHeaderState()

const open = ref(false)
const burger = ref(null)
const panel = ref(null)
const header = ref(null)
const panelTop = ref('var(--header-h)')

const isActive = (item) => {
  const to = typeof item.to === 'string' ? { path: item.to } : item.to
  if (to.hash) return route.path === to.path && route.hash.startsWith(to.hash)
  return route.path === to.path && !route.hash.startsWith('#menu')
}

async function toggle(value = !open.value) {
  // The announcement bar may still be above the header, so pin the panel to the header's real bottom edge
  if (value) panelTop.value = `${header.value.getBoundingClientRect().bottom}px`
  open.value = value
  setPinned(value)
  document.documentElement.style.overflow = value ? 'hidden' : ''
  await nextTick()
  if (value) panel.value?.querySelector('a')?.focus()
  else burger.value?.focus()
}

const onKey = (e) => e.key === 'Escape' && open.value && toggle(false)

watch(() => route.fullPath, () => open.value && toggle(false))
</script>

<template>
  <header ref="header" class="header" :class="{ 'is-scrolled': scrolled, 'is-hidden': hidden && !open }" @keydown="onKey">
    <div class="header__inner container">
      <RouterLink to="/" class="wordmark" aria-label="Spice Dine, home">{{ site.name }}</RouterLink>

      <nav class="header__nav" aria-label="Main">
        <ul role="list">
          <li v-for="item in nav" :key="item.label">
            <RouterLink :to="item.to" class="nav-link" :aria-current="isActive(item) ? 'page' : undefined">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="header__actions">
        <BaseButton :label="copy.cta.order" :href="site.orderUrl" external size="sm" class="header__order" />
        <button
          ref="burger"
          class="burger"
          type="button"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          @click="toggle()"
        >
          <AppIcon :name="open ? 'close' : 'menu'" :size="24" />
          <span class="visually-hidden">{{ open ? 'Close menu' : 'Open menu' }}</span>
        </button>
      </div>
    </div>

    <Transition name="panel">
      <div v-show="open" id="mobile-menu" ref="panel" class="mobile-panel" :style="{ top: panelTop }">
        <nav aria-label="Mobile">
          <ul role="list">
            <li v-for="item in nav" :key="item.label">
              <RouterLink :to="item.to" class="mobile-link" :aria-current="isActive(item) ? 'page' : undefined">
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>
        <div class="mobile-panel__actions">
          <BaseButton :label="copy.cta.order" :href="site.orderUrl" external size="lg" block />
          <BaseButton :label="copy.cta.call" :href="site.phoneHref" icon="phone" variant="secondary" size="lg" block />
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  height: var(--header-h);
  background: transparent;
  border-bottom: 1px solid transparent;
  transition:
    transform var(--dur-base) var(--ease-in-out),
    background-color var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out);
}

.header.is-scrolled {
  background: var(--bg);
  border-bottom-color: var(--line);
}

.header.is-hidden {
  transform: translateY(-100%);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  height: 100%;
}

.wordmark {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 1.3rem + 0.8vw, 1.875rem);
  line-height: 1;
  color: var(--action);
  text-decoration: none;
  padding-block: var(--space-2);
}

.header__nav {
  display: none;
}

.header__nav ul {
  display: flex;
  gap: clamp(1.25rem, 0.5rem + 1.5vw, 2.25rem);
  margin: 0;
}

.nav-link {
  position: relative;
  display: inline-block;
  padding-block: 0.625rem;
  font-weight: 600;
  text-decoration: none;
}

/* Hover underline grows from the left */
.nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 1.5px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-base) var(--ease-out);
}

/* Active route: small turmeric dot */
.nav-link[aria-current='page']::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -4px;
  width: 6px;
  height: 6px;
  margin-left: -3px;
  border-radius: 50%;
  background: var(--highlight);
}

@media (hover: hover) {
  .nav-link:hover::before { transform: scaleX(1); }
}

.header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.burger {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: var(--surface-soft);
  color: var(--action);
  cursor: pointer;
}

.mobile-panel {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-8);
  padding: var(--space-8) var(--gutter) calc(var(--space-8) + env(safe-area-inset-bottom));
  background: var(--bg);
  overflow-y: auto;
}

.mobile-panel ul {
  margin: 0;
}

.mobile-link {
  display: block;
  padding-block: var(--space-3);
  font-family: var(--font-display);
  font-size: clamp(2rem, 1.5rem + 3vw, 2.75rem);
  line-height: 1.2;
  text-decoration: none;
}

.mobile-link[aria-current='page'] {
  color: var(--action);
}

.mobile-panel__actions {
  display: grid;
  gap: var(--space-3);
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@media (max-width: 380px) {
  .header__order :deep(.btn__icon) { display: none; }
  .header__order { padding-right: 1.125rem; }
}

@media (min-width: 810px) {
  .header__nav { display: block; }
  .burger { display: none; }
  .mobile-panel { display: none !important; }
}
</style>
